This folder contains data which is used to build the data files in the `_data` directory.

- `fetch_staff_data.py` uses a list of staff names (including seo suffixes) and a csv file containing expertise information to build `_data/people-info.json`

- `make_projects.py` uses a csv file containing information about CEAN projects to build `_data/projects.json`

This scripts are meant to be run within the `_source_data` directory.
