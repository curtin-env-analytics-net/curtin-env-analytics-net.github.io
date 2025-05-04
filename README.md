# Curtin Environmental Analytics Network Website

The website is built with Jekyll using the Minimal Mistakes template.

To run the website locally, run the following command:

`bundle exec jekyll serve`

## Generating the data

There are some python scripts in the `_source_data` directory which can be used to generate the data files which the website uses. These scripts make use of some python packages which are not installed by default. To run the scripts, you will first need to perform the following steps:

1. Create a Virtual Environment with `python -m venv venv`
2. Enter the Virtual Environment with `source venv/bin/activate`
3. Install the packages with `pip install -r requirements.txt`
