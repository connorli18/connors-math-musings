import re
import argparse

def converter(line, align, moneys):
    changed_line = line.strip()

    if "\\begin{boxedsection" in changed_line:
        changed_line = changed_line.replace("\\begin{boxedsection}", "<div class='boxedsection'>")

    if "\\end{boxedsection" in changed_line:
        changed_line = changed_line.replace("\\end{boxedsection}", "</div>")

    if "\\begin{align" in changed_line:
        align = True
    
    if "\\end{align" in changed_line:
        align = False

    if "$$" in changed_line:
        moneys = not moneys

    if moneys or align:
        return changed_line, align, moneys
    
    #remove pagebreaks
    changed_line = changed_line.replace("\\pagebreak", "")

    #replace `` or '' with "
    changed_line = changed_line.replace("``", '"').replace("''", '"')
    
    #replace section{} with
    if "\\section{" in changed_line:
        changed_line = changed_line.replace("\\section{", "<div class='section'>").replace("}", "</div>")

    #replace \subsection{} with
    if "\\subsection{" in changed_line:
        changed_line = changed_line.replace("\\subsection{", "<div class='subsection'>").replace("}", "</div>")

    #replace \subsubsection{} with
    if "\\subsubsection{" in changed_line:
        changed_line = changed_line.replace("\\subsubsection{", "<div class='subsubsection'>").replace("}", "</div>")
    

    if "\\textbf{" in changed_line:
        changed_line = changed_line.replace("\\textbf{", "<b>", 1).replace("}", "</b>", 1)
        

    if "\\textit{" in changed_line:
        changed_line = changed_line.replace("\textit{", "<i>", 1).replace("}", "</i>", 1)
        

    if "\\underline{" in changed_line:
        changed_line = changed_line.replace("\\underline{", "<u>", 1).replace("}", "</u>", 1)

    # replace the // with <br>
    if not align and not moneys:
        changed_line = changed_line.replace("\\\\", "<br>")

    if "\\end{document" in changed_line:
        changed_line = ''

    if "\\href{" in changed_line:
        
        def replace_href(match):
            url_link = match.group(1)
            text = match.group(2)
            return f'<a href="{url_link}" style="text-decoration: underline;">{text}</a>'
        
        changed_line = re.sub(r'\\href\{(.*?)\}\{(.*?)\}', replace_href, changed_line)

    if "\\begin{itemize" in changed_line:
        changed_line = '<div class="itemize"><ul>'

    if "\\end{itemize" in changed_line:
        changed_line = '</ul></div>'

    if "\\item" in changed_line:
        changed_line = changed_line.replace("\\item", "<li>")

    return changed_line, align, moneys
    

def read_tex_file(file_path):
    output_file_path = f"{file_path.split('.tex')[0]}.txt"
    with open(file_path, 'r') as file, open(output_file_path, 'w') as output_file:
        align = False
        moneys = False
        for line in file:
            print(line)
            changed_line, align, moneys = converter(line, align, moneys)
            output_file.write(changed_line)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert LaTeX to MathJax')
    parser.add_argument('file_path', type=str, help='Path to the LaTeX file')
    args = parser.parse_args()
    read_tex_file(args.file_path)