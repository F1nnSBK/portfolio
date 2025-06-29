import os
import re

import os
import re

def convert_markdown_to_nuxt_content(input_file_path, output_directory):
    """
    Konvertiert eine Markdown-Datei von einem spezifischen Format in das Nuxt Content-Format.

    Args:
        input_file_path (str): Der Pfad zur Eingabe-Markdown-Datei.
        output_directory (str): Das Verzeichnis, in dem die konvertierte Datei gespeichert wird.
    """
    with open(input_file_path, 'r', encoding='utf-8') as f:
        content = f.readlines()

    # Initialisiere Standardwerte
    date = "YYYY-MM-DD"
    tags = []
    title = "Untitled" # Standardtitel, falls keine Tags gefunden werden

    # Durchsuche die ersten paar Zeilen, um Datum und Tags zu finden
    for i, line in enumerate(content[:5]): # Beschränken auf die ersten 5 Zeilen für Effizienz
        # Datum extrahieren
        date_match = re.search(r'(\d{4}-\d{2}-\d{2})', line)
        if date_match:
            date = date_match.group(1)

        # Tags extrahieren
        tags_match = re.search(r'Tags:\s*\[\[(.*?)\]\]', line)
        if tags_match:
            raw_tags = tags_match.group(1).split(']], [[')
            tags = [tag.strip() for tag in raw_tags]
            # Titel ist der erste Tag, falls vorhanden
            if tags:
                title = tags[0]

    # Anfang des Inhalts finden (nach dem anfänglichen Header und der ersten "---")
    content_start_index = 0
    for i, line in enumerate(content):
        if line.strip() == '---' and i > 2: # Finde die '---' nach dem Header
            content_start_index = i + 1
            break
    
    # NEU: Ende des Hauptinhalts finden (vor dem Abschnitt "Verwendung")
    content_end_index = len(content)
    verwendung_section_found = False
    for i in range(len(content) - 1, -1, -1): # Beginne vom Ende der Datei
        line = content[i].strip()
        if line == '## Verwendung:':
            verwendung_section_found = True
            # Finde die '---', die vor diesem '## Verwendung:' steht
            for j in range(i - 1, -1, -1):
                if content[j].strip() == '---':
                    content_end_index = j # Der Inhalt endet vor dieser '---'
                    break
            break # Haben den Abschnitt gefunden und den Index gesetzt, also aufhören
            
    # Hauptteil des Inhalts extrahieren
    main_content = "".join(content[content_start_index:content_end_index]).strip()

    # Nuxt Content Front Matter konstruieren
    nuxt_front_matter = "---\n"
    nuxt_front_matter += f"title: \"{title}\"\n"
    nuxt_front_matter += f"date: \"{date}\"\n"
    nuxt_front_matter += "tags:\n"
    for tag in tags:
        nuxt_front_matter += f"  - \"{tag}\"\n"
    nuxt_front_matter += "---\n\n"

    output_content = nuxt_front_matter + main_content

    # Erstelle das Ausgabe-Verzeichnis, falls es nicht existiert
    os.makedirs(output_directory, exist_ok=True)

    # Definiere den Ausgabe-Dateipfad
    output_file_name = os.path.basename(input_file_path)
    output_file_path = os.path.join(output_directory, output_file_name)

    with open(output_file_path, 'w', encoding='utf-8') as f:
        f.write(output_content)

    print(f"Konvertiert '{input_file_path}' nach '{output_file_path}'")

def process_all_markdown_files(input_directory, output_directory):
    """
    Verarbeitet alle Markdown-Dateien in einem gegebenen Eingabe-Verzeichnis.

    Args:
        input_directory (str): Das Verzeichnis, das die ursprünglichen Markdown-Dateien enthält.
        output_directory (str): Das Verzeichnis, in dem die konvertierten Dateien gespeichert werden.
    """
    if not os.path.isdir(input_directory):
        print(f"Fehler: Das Eingabe-Verzeichnis '{input_directory}' existiert nicht.")
        return

    print(f"Verarbeite Dateien in: '{input_directory}'")
    for filename in os.listdir(input_directory):
        if filename.endswith(".md"):
            input_file_path = os.path.join(input_directory, filename)
            convert_markdown_to_nuxt_content(input_file_path, output_directory)
    print("Verarbeitung abgeschlossen.")

process_all_markdown_files("content/notes/", "content/notes/")