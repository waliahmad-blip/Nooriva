import os
import re

def fix_links_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Regex to find <a href="/..." ...>...</a>
    # It matches internal links starting with '/'
    pattern = r'<a\s+([^>]*href=["\']\/[^"\']*["\'][^>]*)>(.*?)<\/a>'
    
    def replace_link(match):
        attrs = match.group(1)
        inner = match.group(2)
        # Remove 'target=_blank' if present (Link doesn't use it the same way, but usually fine)
        # Just swap tag name
        return f'<Link {attrs}>{inner}</Link>'

    content = re.sub(pattern, replace_link, content, flags=re.DOTALL | re.IGNORECASE)

    if content != original_content:
        # Add import if missing
        if 'import Link from' not in content and 'from "next/link"' not in content:
            # Insert after first import or at top
            lines = content.split('\n')
            insert_idx = 0
            for i, line in enumerate(lines):
                if line.startswith('import '):
                    insert_idx = i + 1
            lines.insert(insert_idx, 'import Link from "next/link";')
            content = '\n'.join(lines)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

fixed_count = 0
for root, dirs, files in os.walk(r'C:\Nooriva\app'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            if fix_links_in_file(path):
                print(f"Fixed: {path}")
                fixed_count += 1

for root, dirs, files in os.walk(r'C:\Nooriva\components'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            if fix_links_in_file(path):
                print(f"Fixed: {path}")
                fixed_count += 1

print(f"Done. Fixed links in {fixed_count} files.")
