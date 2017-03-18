import numpy


def measure_correlation(vector1, vector2):
	min_length = min(len(vector1), len(vector2))
	return numpy.corrcoef(vector1[:min_length], vector2[:min_length])[0,1], min_length


if __name__ == '__main__':
	developed = [19.34, 14.32, 1.83, 2.86, 14.04, 10.80, 19.96, 7.24, 6.88]
	emerging = [11.4, 10.08, 2.44, 2.8, 13.98, 36.76, 14.32]
	cor = measure_correlation(developed, emerging)
	print(cor)