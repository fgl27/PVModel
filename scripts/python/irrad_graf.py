
from pvlib import location
from pvlib import irradiance
import pandas as pd
import numpy as np

from matplotlib import pyplot as plt

# For this example, we will be using Golden, Colorado
tz = 'America/Sao_Paulo'
#Pelotas
lat, lon = -31.7654, -52.3376

# Create location object to store lat, lon, timezone
site = location.Location(lat, lon, tz=tz)

# Calculate clear-sky GHI and transpose to plane of array
# Define a function so that we can re-use the sequence of operations with
# different locations
def get_irradiance(site_location, date, tilt, surface_azimuth, linke_turbidity):
    # Creates one day's worth of 10 min intervals
    times = pd.date_range(date, freq='5min', periods=24*12,
                          tz=site_location.tz)
    # Generate clearsky data using the Ineichen model, which is the default
    # The get_clearsky method returns a dataframe with values for GHI, DNI,
    # and DHI
    clearsky = site_location.get_clearsky(times, model='ineichen', linke_turbidity=linke_turbidity)
    # Get solar azimuth and zenith to pass to the transposition function
    solar_position = site_location.get_solarposition(times=times)
    # Use the get_total_irradiance function to transpose the GHI to POA
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
                         'POA': POA_irradiance['poa_global']})

# Get irradiance data for summer and winter solstice, assuming 25 degree tilt
# and a south facing array
sem_chuva = get_irradiance(site, '01-01-2020', 20, 180, 2.5)
com_chuva = get_irradiance(site, '06-01-2020', 10, 180, 2.5)

# Convert Dataframe Indexes to Hour:Minute format to make plotting easier
sem_chuva.index = sem_chuva.index.strftime("%H:%M")
com_chuva.index = com_chuva.index.strftime("%H:%M")

#dias.to_csv("file.csv")


# Plot GHI vs. POA for winter and summer
fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
sem_chuva['GHI'].plot(ax=ax1, label='GHI')
sem_chuva['POA'].plot(ax=ax1, label='POA')
com_chuva['GHI'].plot(ax=ax2, label='GHI')
com_chuva['POA'].plot(ax=ax2, label='POA')
fsize = 22
ax1.set_xlabel('Hora do dia (verão)', fontsize=fsize)
ax2.set_xlabel('Hora do dia (inverno)', fontsize=fsize)
ax1.set_ylabel('Irradiância ($W/m^2$)', fontsize=fsize)
ax1.legend()
ax2.legend()


l = list(range(1, len(sem_chuva.index)+1))

ax1.set_xticks(l)
ax1.set_xticklabels(sem_chuva.index, rotation=45)
ax1.locator_params(nbins=24, axis='x')

ax2.set_xticks(l)
ax2.set_xticklabels(sem_chuva.index, rotation=45)
ax2.locator_params(nbins=24, axis='x')
ax2.locator_params(nbins=24, axis='y')

ax1.grid()
ax2.grid()

plt.show()

