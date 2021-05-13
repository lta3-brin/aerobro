from os import getenv


def acc_status(a_):
    acc_min = getenv("ACC_THRESHOLD_MIN")
    acc_max = getenv("ACC_THRESHOLD_MAX")

    if a_ <= float(acc_min):
        return 0
    elif float(acc_min) < a_ <= float(acc_max):
        return 1
    elif a_ > float(acc_max):
        return 2
    else:
        return -1


def displ_status(a_):
    displ_min = getenv("DISPL_THRESHOLD_MIN")
    displ_max = getenv("DISPL_THRESHOLD_MAX")

    if a_ <= float(displ_min):
        return 0
    elif float(displ_min) < a_ <= float(displ_max):
        return 1
    elif a_ > float(displ_max):
        return 2
    else:
        return -1


def strn_status(a_):
    strain_min = getenv("STRAIN_THRESHOLD_MIN")
    strain_max = getenv("STRAIN_THRESHOLD_MAX")

    if a_ <= float(strain_min):
        return 0
    elif float(strain_min) < a_ <= float(strain_max):
        return 1
    elif a_ > float(strain_max):
        return 2
    else:
        return -1
