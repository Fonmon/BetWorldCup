#!/usr/bin/env python
import random
import sys

codes_len = int(sys.argv[1])
for i in range(codes_len):
    auth_code = ''.join(random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789') for i in range(25))
    print('INSERT INTO api_registrationcode (`auth_code`,`used`) VALUES (\'{}\',0);'.format(auth_code))