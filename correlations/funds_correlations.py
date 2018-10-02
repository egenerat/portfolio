import csv
import numpy
import seaborn
import sys
import matplotlib.pyplot as plt


def remove_not_values(perf_list):
    return [float(x.replace(',', '.')) for x in perf_list if x not in ['-', '']]


def parse_performances(data_file):
    result = []
    with open(data_file, 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            if len(row):
                result.append((row[0], remove_not_values(row[2:])))
    return result


def highlight_high_correlation(corr, names_list):
    result = {}
    size = len(corr)
    for i in range(size):
        for j in range(size):
            # Not to get duplicates
            if i < j:
                result[corr[i][j]] = (names_list[i], names_list[j])
    return result


def display_correlations(corr_dict, filter_function):
    for corr_val in sorted(corr_dict, reverse=True):
        if filter_function(corr_val):
            print("{:.2g}: {}".format(corr_val, corr_dict[corr_val]))


def display_correlation_heatmap(corr, names_list):
    mask = numpy.zeros_like(corr)
    mask[numpy.triu_indices_from(mask)] = True
    legends = names_list
    with seaborn.axes_style("white"):
        sns_plot = seaborn.heatmap(corr, mask=mask, square=True, center=0, annot=True, cmap="YlGnBu", xticklabels=legends, yticklabels=legends)
        plt.xticks(rotation=30)
        plt.yticks(rotation=30)
        # plt.show()
        # To save the output as a picture
        # sns_plot.get_figure().savefig("output.png")


def calculate_corr_matrix(perf_list):
    perf = []
    names_list = []
    min_size = sys.maxsize
    for index, (name, perf_history) in enumerate(perf_list):
        perf_history_size = len(perf_history)
        # If vector size < 4, we discard it
        if perf_history_size >= 4:
            min_size = min(min_size, perf_history_size)
            names_list.append(name)
            # We normalize the size of the vector
            perf.append(perf_history[:min_size])
    return numpy.corrcoef(perf), names_list, min_size


def main(filename):
    perf_list = parse_performances(filename)
    corr, names_list, min_size = calculate_corr_matrix(perf_list)

    high_corr = highlight_high_correlation(corr, names_list)
    print("Highly correlated securities")
    display_correlations(high_corr, lambda corr: corr > 0.8)
    print("\nNegatively correlated securities")
    display_correlations(high_corr, lambda corr: corr < -0.5)
    # based on performances by quarter
    history_years = min_size / 4
    print("\nHistory size: {} years".format(history_years))
    display_correlation_heatmap(corr, names_list)


if __name__ == '__main__':
    FILENAME = "data/portfolio.csv"
    main(FILENAME)