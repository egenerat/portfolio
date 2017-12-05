import csv
import numpy
import seaborn


def remove_not_values(perf_list):
    return [float(x.replace(',', '.')) for x in perf_list if x != '-' and x != '']


def parse_performances(data_file):
    result = []
    with open(data_file, 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            if len(row):
                result.append((row[0], remove_not_values(row[2:])))
    return result


def highlight_high_correlation(corr, names_list, highlight_min):
    result = {}
    size = len(corr)
    for i in range(0, size):
        for j in range(0, size):
            correlation = corr[i][j]
            if correlation > highlight_min and i < j:
                # print('{} || {} || {}'.format(correlation, names_list[i], names_list[j]))
                result[correlation] = '{} || {}'.format(names_list[i], names_list[j])
    return result


def order_correlations(corr_dict):
    for corr_val in sorted(corr_dict, reverse=True):
        print("{:.2g}: {}".format(corr_val, corr_dict[corr_val]))


def display_correlation_heatmap(corr, names_list):
    mask = numpy.zeros_like(corr)
    mask[numpy.triu_indices_from(mask)] = True
    legends = names_list
    with seaborn.axes_style("white"):
        seaborn.heatmap(corr, mask=mask, square=True, center=0, annot=True, cmap="YlGnBu", xticklabels=legends,
                        yticklabels=legends)
        # seaborn.heatmap(corr, mask=mask, square=True, center=0, cmap="YlGnBu")
        seaborn.plt.xticks(rotation=30)
        seaborn.plt.yticks(rotation=30)
        seaborn.plt.show()


def calculate_corr_matrix(perf_list):
    funds = {}
    perf = []
    names_list = []
    min_size = 1000
    for index, (name, perf_history) in enumerate(perf_list):
        funds[index] = name
        perf_history_size = len(perf_history)
        # print('{} {}'.format(perf_history_size, name))
        if perf_history_size >= 4:
            if perf_history_size < min_size:
                min_size = perf_history_size
            names_list.append(name)
            perf.append(perf_history[:min_size])
    return numpy.corrcoef(perf), names_list, min_size


if __name__ == '__main__':
    filename = "data/all_funds_performances_per_quarter.csv"
    perf_list = parse_performances(filename)
    corr, names_list, min_size = calculate_corr_matrix(perf_list)

    # TODO Idem with lowest
    high_corr = highlight_high_correlation(corr, names_list, -1)
    order_correlations(high_corr)
    # display_correlation_heatmap(corr, names_list)
    # based on performances by quarter
    history_years = min_size / 4
    print('History size: {} years'.format(history_years))
    display_correlation_heatmap(corr, names_list)
