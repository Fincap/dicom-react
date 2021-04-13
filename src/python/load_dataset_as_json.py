def load_dataset_as_json():
    # pylint: disable=import-error
    from js import raw_loaded, cur_file   # Access the context passed into the worker
    import pydicom
    import json

    filename = str(cur_file) + ".dcm"
    with open(filename, "wb") as f:
        f.write(raw_loaded[cur_file].tobytes())

    ds = pydicom.dcmread(filename)
    return json.dumps(ds.to_json())


load_dataset_as_json()
