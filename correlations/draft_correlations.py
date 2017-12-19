import numpy


def measure_correlation(vector1, vector2):
    min_length = min(len(vector1), len(vector2))
    return numpy.corrcoef(vector1[:min_length], vector2[:min_length])[0, 1], min_length


def correlation_matrix(list_vectors):
    # min_length = min(len(vector1), len(vector2))
    return numpy.corrcoef([[1, 2, 3, 4], [2, 3.9, 6, 8], [4, 5.4, 3, 4.5]])

if __name__ == '__main__':
    DEVELOPED = [19.34, 14.32, 1.83, 2.86, 14.04, 10.80, 19.96, 7.24, 6.88]
    EMERGING = [11.4, 10.08, 2.44, 2.8, 13.98, 36.76, 14.32]
    ASIA = [16.44, 10.95, 2.55, 2.90, 13.14, 42.99, 14.93]
    EMERGING = [14.25, 11.86, 1.79, 3.42, 12.28, 39.59, 14.44]
    cor = measure_correlation(ASIA, EMERGING)
    print(cor)

    V1 = [1, 2, 3, 4]
    V2 = [2, 4, 6, 8]
    V3 = [8, 6, 4, 2]
    M = correlation_matrix([V1, V2, V3])
    print(M)
