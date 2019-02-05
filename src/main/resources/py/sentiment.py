# -*- coding=UTF-8 -*-
from snownlp import SnowNLP
import sys
input = sys.argv[1]
inputu = input.decode('UTF-8')
s=SnowNLP(inputu)
print (s.sentiments)
