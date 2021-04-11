# This script requires the pyodide.globals.raw_loaded be set to a list of Int8Arrays (i.e. raw DICOM data)
import pydicom

filenames = []

# pylint: disable=undefined-variable
for i, raw_image in enumerate(raw_loaded):
    filename = str(i) + ".dcm"
    filenames.append(filename)
    with open(filename, "wb") as f:
        f.write(raw_image.tobytes())

for dicom_file in filenames:
    ds = pydicom.dcmread(filename)
    dataset_list_json.append(ds.to_json())
