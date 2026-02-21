import csv
import json
import requests
from slugify import slugify

with open("projects.csv", "r") as file:
    reader = csv.DictReader(file)
    result = []
    for row in reader:
        title = row.get("Project Title")
        image_path = row.get("Image")
        query_loc = image_path.find("?")
        file_extension = image_path[image_path.rfind(".",0,query_loc):query_loc]
        resp = requests.get(image_path)
        file_name = f"{slugify(title)}{file_extension}"
        with open(f"../assets/images/projects/{file_name}", "wb") as image_file:
            image_file.write(resp.content)

        new_entry = {
            "title": title,
            "slug": slugify(title),
            "funders": [x.strip() for x in row.get("Partners").split(",")],
            "collaborators": [x.strip() for x in row.get("CEAN Leads").split(",")],
            "description": row.get("Project Blurb"),
            "image": file_name
        }

        result.append(new_entry)

        with open(f"../_projects/{new_entry["slug"]}.md", "w") as f:
            f.write(f"---\nlayout: project-display\ntitle: {title}\nimage: {new_entry["image"]}\nfunders: {new_entry["funders"]}\ncollaborators: {new_entry["collaborators"]}\ndescription: \"{new_entry["description"]}\"\nis_project_page: true\n---")

with open("../_data/projects.json", "w") as file:
    json.dump(result, file, ensure_ascii=False, indent=4)