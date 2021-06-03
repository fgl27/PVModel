from pvlib.temperature import pvsyst_cell
from pvlib.solarposition import get_solarposition
from pvlib import pvsystem
from pvlib.location import Location
from pvlib import irradiance
from pvlib import location

import pandas as pd
import numpy as np


temp = pvsyst_cell(180.929, 17, wind_speed=0.8, u_c=29.0, u_v=1.0, eta_m=0.1, alpha_absorption=0.9)
#print(temp)

# For this example, we will be using Golden, Colorado
tz = 'America/Sao_Paulo'
#Pelotas
#lat, lon = -31.7654, -52.3376

#Santa Maria
lat, lon = -29.7, -53.7

# Create location object to store lat, lon, timezone
site = location.Location(lat, lon, tz=tz)
dia = '01-01-2020'

#times = pd.date_range('2020-01-01 00:00:00', '2020-01-02', closed='left', freq='H', tz=tz)
#data = get_solarposition(times, lat, lon)

#cols=6
#maxlen=24
#i=0
#m=[data[i:i+cols] for i in range(0, maxlen, cols)]
#print(m)

#                         get_irradiance(solar_zenith, solar_azimuth, dni, ghi, dhi, dni_extra=None, airmass=None, model='haydavies', **kwargs)
#irra = pvsystem.PVSystem.get_irradiance(95.082645, 246.046351, 567.0, 100.0, 233.0)


system = pvsystem.PVSystem(surface_tilt=20, surface_azimuth=180)
times = pd.date_range(start='20200101 1200-0300',
                      end='20200101 1800-0300', freq='6H')

#times = pd.date_range('2020-01-01 00:00:00', '2020-01-01 06:00:00', freq='6H', tz=tz)

solar_position = site.get_solarposition(times)
irrads = pd.DataFrame({'dni':[567,481], 'ghi':[600,192], 'dhi':[243,58]},
                      index=times)

#solares = pd.DataFrame({'apparent_zenith':[108.753332,55.297274], 'azimuth':[106.019756,170.433057]},
#                      index=times)

irradiance = system.get_irradiance(solar_position['apparent_zenith'],
                                   solar_position['azimuth'],
                                   irrads['dni'],
                                   irrads['ghi'],
                                   irrads['dhi'],
                                   model='haydavies')

#print(solar_position)
print(solar_position['apparent_zenith'])
print(solar_position['azimuth'])
print(irradiance)
