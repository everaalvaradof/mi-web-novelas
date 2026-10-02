import os
import re

def encontrar_capitulos_faltantes(archivo_salida="faltantes.txt"):
    # Obtiene la ruta donde está corriendo este script
    ruta_carpeta = os.path.dirname(os.path.abspath(__file__))
    if not ruta_carpeta:
        ruta_carpeta = os.getcwd()
        
    print(f"Revisando títulos de archivos en: {ruta_carpeta}")
    
    numeros_encontrados = set()
    archivos = os.listdir(ruta_carpeta)

    for nombre_archivo in archivos:
        # Ignorar este propio script y el archivo de salida
        if nombre_archivo == os.path.basename(__file__) or nombre_archivo == archivo_salida:
            continue
            
        # Buscar números dentro del nombre del archivo (título)
        nums = re.findall(r'\d+', nombre_archivo)
        if nums:
            # Usamos el primer número que encuentre en el título (ej: "Capitulo 5.txt" -> 5)
            num_capitulo = int(nums[0])
            numeros_encontrados.add(num_capitulo)
            print(f"Archivo: '{nombre_archivo}' -> Capítulo detectado: {num_capitulo}")
        else:
            print(f"Archivo ignorado (sin número en el título): '{nombre_archivo}'")

    if not numeros_encontrados:
        print("\n¡Atención! Ningún archivo tiene números en su título.")
        return

    min_num = min(numeros_encontrados)
    max_num = max(numeros_encontrados)
    
    rango_completo = set(range(min_num, max_num + 1))
    faltantes = sorted(list(rango_completo - numeros_encontrados))

    ruta_salida = os.path.join(ruta_carpeta, archivo_salida)
    with open(ruta_salida, 'w', encoding='utf-8') as f:
        f.write(f"Rango analizado: del {min_num} al {max_num}\n")
        f.write(f"Total de capítulos faltantes: {len(faltantes)}\n")
        f.write("-" * 30 + "\n")
        if faltantes:
            for num in faltantes:
                f.write(f"{num}\n")
        else:
            f.write("¡No falta ningún capítulo en la secuencia!\n")

    print(f"\n¡Listo! Archivo generado con éxito: {archivo_salida}")

if __name__ == "__main__":
    encontrar_capitulos_faltantes()