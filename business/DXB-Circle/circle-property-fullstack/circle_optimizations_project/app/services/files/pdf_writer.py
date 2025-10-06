from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
def write_term_sheet_pdf(path: str, title: str, bullets: list[str]):
    c = canvas.Canvas(path, pagesize=A4); width, height = A4; y = height - 72
    c.setFont("Helvetica-Bold", 14); c.drawString(72, y, title); y -= 24; c.setFont("Helvetica", 11)
    for b in bullets:
        c.drawString(80, y, f"• {b}"); y -= 16
        if y < 72: c.showPage(); y = height - 72; c.setFont("Helvetica", 11)
    c.save(); return path
