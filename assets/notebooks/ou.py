import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

theta = 0.7
mu = 0
sigma = 0.3
dt = 0.01
n = 1000

x = np.zeros(n)
x[0] = 0.5
for i in range(1, n):
    dx = theta * (mu - x[i-1]) * dt + sigma * np.sqrt(dt) * np.random.randn()
    x[i] = x[i-1] + dx
    
t = np.linspace(0, n*dt, n)
z = np.zeros(n)

df = pd.DataFrame({'x': t, 'y': x, 'z': z})
df.to_csv('ou_process.csv', index=False)

df.plot(x='x', y='y')
plt.show()