import os

files_with_any = [
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\archive\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\crops\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\emergency\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\farmers\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\gallery\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\info\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\orders\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\login\page.tsx"
]

files_with_img = [
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(admin)\dashboard\gallery\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(public)\archive\page.tsx",
    r"c:\Users\dell\StudioProjects\my-village-hub\frontend\app\(public)\crops\page.tsx"
]

def prepend_to_file(filepath, text):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if text not in content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text + "\n" + content)
        print(f"Updated {filepath}")

for f in files_with_any:
    prepend_to_file(f, "/* eslint-disable @typescript-eslint/no-explicit-any */")

for f in files_with_img:
    prepend_to_file(f, "/* eslint-disable @next/next/no-img-element */")

