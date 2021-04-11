# pylint: disable=import-error
import micropip


def pydicom_init(*args):
    import pydicom
    print("Pydicom loaded")


await micropip.install('pydicom-2.0.0-py3-none-any.whl')
pydicom_init()
