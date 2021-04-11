def load_dataset_as_json():
    # pylint: disable=import-error
    from js import raw_loaded   # Access the context passed into the worker
    import pydicom
    filenames = []

    # pylint: disable=undefined-variable
    for i, raw_image in enumerate(raw_loaded):
        filename = str(i) + ".dcm"
        filenames.append(filename)
        with open(filename, "wb") as f:
            f.write(raw_image.tobytes())

    dataset_list_json = []

    for filename in filenames:
        ds = pydicom.dcmread(filename)
        dataset_list_json.append(ds.to_json())

    return dataset_list_json


load_dataset_as_json()
