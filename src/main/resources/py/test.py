# -*- coding=UTF-8 -*-
from snownlp import SnowNLP
import sys
input = sys.argv[1]

s=SnowNLP(input)
print (s.sentiments)
