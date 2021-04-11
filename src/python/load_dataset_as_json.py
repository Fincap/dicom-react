# pylint: disable=import-error
from js import raw_loaded   # Access the context passed into the worker
import pydicom
print("here")
filenames = []

# pylint: disable=undefined-variable
for i, raw_image in enumerate(raw_loaded):
    filename = str(i) + ".dcm"
    filenames.append(filename)
    with open(filename, "wb") as f:
        f.write(raw_image.tobytes())

dataset_list_json = []

for dicom_file in filenames:
    ds = pydicom.dcmread(filename)
    dataset_list_json.append(ds.to_json())

dataset_list_json  # Return the result
"done"
