import os
import re

directory = r"c:\Users\dell\StudioProjects\my-village-hub\frontend"

replacements = {
    "text-text-main": "text-text-primary",
    "text-text-muted": "text-text-secondary",
    "bg-surface-muted": "bg-gray-50",
    "bg-surface": "bg-white",
    "border-gray-100": "border-border",
    "border-gray-200": "border-border",
    "border-gray-300": "border-border",
    "shadow-lg": "shadow-card",
    "shadow-xl": "shadow-card",
    "rounded-2xl": "rounded-card",
    "rounded-xl": "rounded-button",
    "text-red-500": "text-error",
    "text-red-600": "text-error",
    "bg-red-500": "bg-error",
    "bg-red-600": "bg-error",
    "bg-red-700": "bg-error",
    "border-red-500": "border-error",
    "focus:ring-red-500": "focus:ring-error",
    "focus:border-red-500": "focus:border-error"
}

def replace_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements.items():
        if old != new:
            content = content.replace(old, new)
            
    content = re.sub(r'\b(py-16|py-20|py-24|py-32)\b', 'py-section', content)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

count = 0
for root, _, files in os.walk(directory):
    if "node_modules" in root or ".next" in root:
        continue
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts"):
            replace_in_file(os.path.join(root, file))
            count += 1
            
print(f"Processed {count} typescript files.")
