
from pvlib import location
from pvlib import irradiance
import datetime
import pandas as pd
import numpy as np
import math
from matplotlib import pyplot as plt

# For this example, we will be using Golden, Colorado
tz = 'America/Sao_Paulo'
#Pelotas
lat, lon = -31.7654, -52.3376

#Santa Maria
#lat, lon = -29.7, -53.7

# Create location object to store lat, lon, timezone
site = location.Location(lat, lon, tz=tz)
dia = '01-01-2020'

# Calculate clear-sky GHI and transpose to plane of array
# Define a function so that we can re-use the sequence of operations with
# different locations
def get_irradiance(site_location, date, tilt, surface_azimuth, linke_turbidity):
    # Creates one day's worth of 10 min intervals
    times = pd.date_range(date, freq='60min', periods=24,
                          tz=site_location.tz)
    # Generate clearsky data using the Ineichen model, which is the default
    # The get_clearsky method returns a dataframe with values for GHI, DNI,
    # and DHI
    clearsky = site_location.get_clearsky(times, model='ineichen', linke_turbidity=linke_turbidity)
    # Get solar azimuth and zenith to pass to the transposition function
    solar_position = site_location.get_solarposition(times=times)
    solar_zenith = solar_position['apparent_zenith']
    solar_azimuth = solar_position['azimuth']

    # Use the get_total_irradiance function to transpose the GHI to POA
    AOI = irradiance.aoi(
        surface_tilt=tilt,
        surface_azimuth=surface_azimuth,
        solar_zenith=solar_position['apparent_zenith'],
        solar_azimuth=solar_position['azimuth'])

    POA_irradiance = irradiance.get_total_irradiance(
        surface_tilt=tilt,
        surface_azimuth=surface_azimuth,
        dni=clearsky['dni'],
        ghi=clearsky['ghi'],
        dhi=clearsky['dhi'],
        solar_zenith=solar_position['apparent_zenith'],
        solar_azimuth=solar_position['azimuth'])
    # Return DataFrame with only GHI and POA
    return pd.DataFrame({'GHI': clearsky['ghi'],
                         'DNI': clearsky['dni'],
                         'DHI': clearsky['dhi'],
                         'POA': POA_irradiance['poa_global'],
                         'Eb': POA_irradiance['poa_direct'],
                         'Ed': POA_irradiance['poa_sky_diffuse'],
                         'Eg': POA_irradiance['poa_ground_diffuse'],
                         'AOI(rad)': np.radians(AOI),
                         'zenith(rad)': np.radians(solar_zenith),
                         'azimuth(rad)': np.radians(solar_azimuth)
                         })
#    return irrads.drop(irrads.columns[[0]], axis=1)

# Get irradiance data for summer and winter solstice, assuming 25 degree tilt
# and a south facing array
dias = get_irradiance(site, dia, 20, 180, 2.7533)

#dias.to_csv("file.csv")

print("Localidade Latitude (N) " + str(lat) + " Longitude (E) " + str(lon) + " Dia " + dia)
print(dias)

