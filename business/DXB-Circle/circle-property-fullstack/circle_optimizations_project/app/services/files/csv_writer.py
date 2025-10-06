import csv
from typing import List, Dict
def write_csv(path: str, rows: List[Dict]):
    if not rows: open(path, "w").close(); return path
    headers = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=headers); w.writeheader()
        for r in rows: w.writerow(r)
    return path
