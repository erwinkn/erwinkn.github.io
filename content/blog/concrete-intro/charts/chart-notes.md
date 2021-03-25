# Notes on the chart data
To keep track of how the data was obtained

## Embodied CO2
All data comes from the ICE v3 database
- Clay: taken from the statistical data in the material profile (to get values per kg). Took the percentiles provided there
- Cement: data from the summary. Max is CEM-I. Box is delimited by min and max of CEM-II. Middle is avg of CEM-II. Min is 73% GBFS cement (88% seemed unrealistic).
- Concrete: I consider normal concrete (10 to 40 MPa). Values are average over that range (GEN 2 to RC32/40). Max is max for CEM-I. I consider as CEM-II all concrete with 14-30% of clinker substitution. Box is delimited by min, max and avg over that range. Min is min for 70% GBFS.
- Timber: min, q1, median, q3 and max over summary data, excluding wood-plastic composite.