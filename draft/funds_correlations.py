import csv
import numpy
import seaborn


def remove_not_values(perf_list):
    return [float(x.replace(',', '.')) for x in perf_list if x != '-' and x != '']


def parse_performances():
    result = []
    data_file = "data/all_funds_performances.csv"
    with open(data_file, 'r') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"')
        for row in reader:
            if len(row):
                result.append((row[0], remove_not_values(row[2:])))
    return result


if __name__ == '__main__':
    perf_list = parse_performances()
    funds = {}
    perf = []
    min_size = 1000
    names_list = []
    for index, (name, perf_history) in enumerate(perf_list):
        funds[index] = name
        perf_history_size = len(perf_history)
        if perf_history_size < min_size:
            min_size = perf_history_size
        names_list.append(name)
        perf.append(perf_history[:min_size])
    corr = numpy.corrcoef(perf)

    mask = numpy.zeros_like(corr)
    mask[numpy.triu_indices_from(mask)] = True
    legends = names_list
    with seaborn.axes_style("white"):
        g = seaborn.heatmap(corr, mask=mask, square=True, center=0, annot=True, cmap="YlGnBu", xticklabels=legends, yticklabels=legends)
        seaborn.plt.xticks(rotation=30)
        seaborn.plt.yticks(rotation=30)
        seaborn.plt.show()