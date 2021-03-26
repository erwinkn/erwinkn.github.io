# Notes on the chart data
To keep track of how the data was obtained

## Global production
Some of these are very rough estimations, but they appear to be consistent with the graph from [Scrivener et al. (2016)](https://wedocs.unep.org/bitstream/handle/20.500.11822/25281/eco_efficient_cements.pdf)

### Steel
1870Mt in 2019 ([source](https://www.worldsteel.org/media-centre/press-releases/2020/Global-crude-steel-output-increases-by-3.4--in-2019.html))

### Wood
[2019 statistics](http://www.fao.org/forestry/statistics/80938/en/) given by the FAO.

Roundwood = all wood removed from forests in a year = 3,966 million m3 in 2019. Assuming an average density of 0.75g/cm3, we get around 3 Gigatonnes. This seems to match the values obtained by Scrivener et al., taking into account a strong growth in the global forest products market over the past decade.

### Concrete
2019 cement production = [4.1 billion](https://www.iea.org/reports/cement). Assuming an average content of 280kg of cement per m3 of concrete, a density of 2400 kg/m3 for concrete and a conservative estimate of 50% of global cement going into concrete we get 17.57 Gt of global concrete production.

### Asphalt
102 Mt estimated global world use according to Wikipedia. Same number given in [this course](https://www.coursera.org/lecture/mastering-bitumen/3-global-bitumen-market-main-uses-and-development-vfJ2h) from Ecole des Ponts ParisTech

### Glass
Around 200Mt, according to [this presentation](http://www.iyog2022.org/images/files/77-economicsiyog-200925.pdf) or [this report](https://www.grandviewresearch.com/industry-analysis/glass-manufacturing-market)

## Embodied CO2
All data comes from the ICE v3 database
- Clay: taken from the statistical data in the material profile (to get values per kg). Took the percentiles provided there.
- Cement: data from the summary. Max is CEM-I. Box is delimited by min and max of CEM-II. Middle is avg of CEM-II. Min is 73% GBFS cement (88% seemed unrealistic).
- Concrete: I considered normal concrete (10 to 40 MPa). Values are averaged over that range (GEN 2 to RC32/40). Max is the max value for CEM-I. I consider as CEM-II all concrete with 14-30% of clinker substitution. Box is delimited by min, max and avg for CEM-II. Min is the minimum value for 70% GBFS.
- Timber: min, q1, median, q3 and max over summary data, excluding wood-plastic composite.