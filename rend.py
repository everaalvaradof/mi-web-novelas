import os
from PIL import Image

# Ruta de la carpeta de portadas
input_dir = "public/portada"

if not os.path.exists(input_dir):
    print(f"No se encontró la carpeta {input_dir}")
    exit()

print("Optimizando portadas...")

for filename in os.listdir(input_dir):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        img_path = os.path.join(input_dir, filename)
        
        try:
            with Image.open(img_path) as img:
                # Convertir a RGB si es PNG con transparencia para evitar errores al guardar como JPG
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                # Ancho máximo recomendado para portadas web (ej. 400px mantiene excelente calidad y baja el peso drásticamente)
                max_width = 400
                if img.width > max_width:
                    w_percent = (max_width / float(img.width))
                    h_size = int(float(img.height) * float(w_percent))
                    img = img.resize((max_width, h_size), Image.Resampling.LANCZOS)
                
                # Guardar comprimido con calidad 80
                img.save(img_path, "JPEG", quality=80, optimize=True)
                print(f"Optimizado: {filename} -> Nuevo tamaño: {img.width}x{img.height}")
                
        except Exception as e:
            print(f"Error procesando {filename}: {e}")

print("¡Todas las portadas han sido optimizadas con éxito!")