
## fixinity backend
I use pipenv instead of creating requirements.txt file and installing with pip as it install globally.

Requirements: 
            Python 3+ and Pipenv installed locally.

### Start the backend:
```
    # from the fixinity/fixTrunk directory: 
    pipenv install
    ./bootstrap.sh
```


> if you get OSError: [Errno 48] Address already in use:
    $ ps -fA | grep python
    $ kill <number of process>  something like 81651