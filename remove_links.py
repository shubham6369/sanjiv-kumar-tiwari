import re

def remove_links():
    with open('index.html', 'r', encoding='utf-8') as f:
        text = f.read()

    start_marker = '<!-- ====== Government Departments Section ====== -->'
    end_marker = '<!-- ====== Reports Dashboard ====== -->'

    start_idx = text.find(start_marker)
    end_idx = text.find(end_marker)

    if start_idx != -1 and end_idx != -1:
        section = text[start_idx:end_idx]
        
        # Remove spacing + onclick attributes using regex
        new_section = re.sub(r'\s*onclick=\"window\.open\(\'[^\']+\',\s*\'_blank\'\)\"', '', section)
        
        new_text = text[:start_idx] + new_section + text[end_idx:]
        
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_text)
        print('Links removed from Government Departments section successfully.')
    else:
        print('Could not find section markers.')

if __name__ == '__main__':
    remove_links()
