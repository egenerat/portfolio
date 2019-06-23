#!/usr/bin/python3
import csv
import numpy
import seaborn
import sys
import matplotlib.pyplot as plt
import json


def remove_not_values(perf_list):
    return [float(x.replace(',', '.')) for x in perf_list if x not in ['-', '']]


def parse_performances_from_csv_file(data_file):
    result = []
    with open(data_file, 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            if len(row):
                result.append((row[0], remove_not_values(row[1:])))
    return result

def parse_performances_from_dict(securities):
    result = []
    for sec in securities:
        if all(i in sec for i in ["security", "performances"]):
            result.append((sec["security"], sec["performances"]))
        else:
            print(f"Invalid object {sec}")
    return result

def correlations_as_list(corr, names_list):
    result = []
    size = len(corr)
    for i in range(size):
        for j in range(size):
            # Not to get duplicates
            if i < j:
                result.append( (corr[i][j], (names_list[i], names_list[j])) )
    return result


def display_correlations(corr_dict, filter_function):
    for corr_val in sorted(corr_dict, reverse=True):
        if filter_function(corr_val):
            [sec_a, sec_b] = corr_dict[corr_val]
            print("{:.2f}: {:60} {:60}".format(corr_val, sec_a, sec_b))


def display_correlation_heatmap(corr, names_list, api_mode):
    mask = numpy.zeros_like(corr)
    mask[numpy.triu_indices_from(mask)] = True
    legends = names_list
    with seaborn.axes_style("white"):
        seaborn.set(rc={'figure.figsize':(40,30)})
        sns_plot = seaborn.heatmap(corr, mask=mask, square=True, center=0, annot=True, cmap="YlGnBu", xticklabels=legends, yticklabels=legends)
        plt.xticks(rotation=30, ha='right')
        plt.yticks(rotation=30)
        if api_mode:
            sns_plot.get_figure().savefig("output.png")
        else:
            plt.show()


def calculate_corr_matrix(perf_list, api_mode):
    perf = []
    names_list = []
    min_size = sys.maxsize
    for _, (name, perf_history) in enumerate(perf_list):
        perf_history_size = len(perf_history)
        # If vector size < 4, we discard it
        if perf_history_size >= 4:
            min_size = min(min_size, perf_history_size)
            names_list.append(name)
            perf.append(perf_history)
    if len(perf) < 2:
        raise Exception("Cannot compute correlations: not enough securities")

    # We normalize the size of all the vectors
    normalized_performances = []
    limiting = []
    for index, val in enumerate(perf):
        normalized_performances.append(val[:min_size])
        if len(val) == min_size:
            limiting.append(names_list[index])
    if not api_mode:
        print(f"\nLimiting: {min_size} quarters")
        for i in limiting:
            print(i)
    return numpy.corrcoef(normalized_performances), names_list, min_size, limiting

# Example input
# [('Security name 1', [2.32, 5.43, 4.65, 2.98, -1.15]), ('Security name 2', [9.47, 3.47, 3.1, 6.75, -7.63])
# api_mode: does not print nicely the results in the console, does not open the plot
def correlations(performances, api_mode=True):
    corr, names_list, min_size, limiting = calculate_corr_matrix(performances, api_mode)
    corr_list = correlations_as_list(corr, names_list)
    if not api_mode:
        print("\nHighly correlated securities")
        display_correlations(corr_list, lambda corr: corr > 0.8)
        print("\nNegatively correlated securities")
        display_correlations(corr_list, lambda corr: corr < -0.5)
        # based on performances by quarter
        history_years = min_size / 4
        print("\nHistory size: {} years".format(history_years))
    display_correlation_heatmap(corr, names_list, api_mode)
    return corr_list, min_size, limiting


if __name__ == '__main__':
    FILENAME = "data/portfolio.csv"
    perf_list = parse_performances_from_csv_file(FILENAME)
    # perf_json = json.loads('[{"security": "name1", "performances": [1, 2, 3, 4]}, {"security": "name2", "performances": [2, 4, 7, 9]}]')
    # perf_list = parse_performances_from_json(perf_json)
    correlations(perf_list, False)