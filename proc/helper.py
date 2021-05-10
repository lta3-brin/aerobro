def acc_status(a_):
    if a_ <= 0.4:
        return 0
    elif 0.4 < a_ <= 0.7:
        return 1
    elif a_ > 0.7:
        return 2
    else:
        return -1


def displ_status(a_):
    if a_ <= 3:
        return 0
    elif 3 < a_ <= 3.5:
        return 1
    elif a_ > 3.5:
        return 2
    else:
        return -1


def strn_status(a_):
    if a_ <= 0.05:
        return 0
    elif 0.05 < a_ <= 0.07:
        return 1
    elif a_ > 0.07:
        return 2
    else:
        return -1
