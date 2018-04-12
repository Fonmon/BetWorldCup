#!/usr/bin/env python
import random

# parameter
for i in range(20):
    auth_code = ''.join(random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789') for i in range(25))
    print('INSERT INTO api_registrationcode (`auth_code`) VALUES (\'{}\');'.format(auth_code))