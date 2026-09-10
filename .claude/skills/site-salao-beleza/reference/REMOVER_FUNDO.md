# Como remover fundo de fotos (produtos e logos)

Duas situações diferentes, duas técnicas diferentes. As duas usam só Python + Pillow (`pip install pillow numpy` se não estiver instalado).

## 1. Foto de produto com fundo liso (branco ou preto)

Uso: fotos de produto em estúdio, fundo de cor sólida (branco ou preto), às vezes com uma sombra suave embaixo do produto.

Técnica: **crescimento de região (flood fill) a partir das bordas da imagem**, comparando cada pixel ao vizinho (não a uma cor fixa global) — assim funciona tanto para fundo branco quanto preto, e não "vaza" para dentro do produto mesmo quando o produto tem áreas quase da mesma cor do fundo (ex: garrafa branca em fundo branco), porque exige um caminho contínuo de variação pequena entre pixels vizinhos partindo da borda.

```python
from collections import deque
from PIL import Image, ImageFilter
import numpy as np

def flood_bg_remove(path, out_path, step_tol=20, global_tol=40, feather=2):
    im = Image.open(path).convert("RGB")
    arr = np.array(im).astype(np.int16)
    h, w, _ = arr.shape
    corners = [arr[0,0], arr[0,w-1], arr[h-1,0], arr[h-1,w-1]]
    seed = np.median(np.stack(corners), axis=0)
    visited = np.zeros((h, w), dtype=bool)
    bg = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h-1):
            q.append((y, x))
    for y in range(h):
        for x in (0, w-1):
            q.append((y, x))
    for y, x in list(q):
        visited[y, x] = True
    while q:
        y, x = q.popleft()
        bg[y, x] = True
        c = arr[y, x]
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                nc = arr[ny, nx]
                if np.max(np.abs(nc - c)) <= step_tol and np.max(np.abs(nc - seed)) <= global_tol:
                    visited[ny, nx] = True
                    q.append((ny, nx))
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha_im = Image.fromarray(alpha, mode="L")
    if feather:
        blurred = alpha_im.filter(ImageFilter.GaussianBlur(feather))
        alpha = np.array(blurred)
        alpha = np.where(bg, alpha, np.maximum(alpha, 255*(~bg)))
    out = np.dstack([np.array(im), alpha]).astype(np.uint8)
    Image.fromarray(out, mode="RGBA").save(out_path)
```

Parâmetros que às vezes precisam de ajuste manual (teste e olhe o resultado antes de usar):
- **Fundo branco**: `step_tol=20, global_tol=40` funciona bem na maioria dos casos — o `global_tol` baixo evita "comer" partes do produto que também são claras.
- **Fundo preto com sombra suave que também deve sumir**: aumente `global_tol` para algo como `200-220` (o produto costuma ser muito mais claro que isso, então continua protegido), mantendo `step_tol` em torno de `25-30`.
- Sempre **abra o resultado e confira visualmente** (compor sobre um fundo escuro de teste) antes de usar — nunca assuma que os parâmetros padrão servem para todas as fotos.

```python
# conferir visualmente compondo sobre um fundo escuro
bg = Image.new("RGB", im.size, (61,36,28))
fg = Image.open(out_path).convert("RGBA")
bg.paste(fg, (0,0), fg)
bg.save("/tmp/preview.png")
```

## 2. Logo com fundo "quadriculado" (transparência falsa)

Uso: quando o cliente manda uma logo em PNG mas o fundo aparece como um xadrez cinza em vez de transparente de verdade — sinal de que alguém exportou/tirou print da PRÉVIA de transparência de um editor, e não da imagem com canal alfa real.

Técnica: a logo em si costuma ser de uma cor sólida (branco puro ou preto puro), bem diferente do cinza do quadriculado. Em vez de tentar remover o padrão xadrez, usa-se o BRILHO do pixel como canal alfa (rampa linear), o que automaticamente ignora o quadriculado (tons médios de cinza) e preserva só o que é realmente branco/preto puro, com uma borda suave nas bordas anti-aliasing da logo.

```python
import numpy as np
from PIL import Image

def extract_logo(path, out_path, target, low, high, invert=False):
    im = Image.open(path).convert("RGB")
    arr = np.array(im).astype(np.float32)
    brightness = arr.mean(axis=2)
    if invert:
        # logo escura (preta): alpha alto onde o brilho é baixo
        alpha = (low - brightness) / (low - 0)
    else:
        # logo clara (branca): alpha alto onde o brilho é alto
        alpha = (brightness - high) / (255 - high)
    alpha = np.clip(alpha, 0, 1)
    alpha = (alpha * 255).astype(np.uint8)
    color = np.zeros((*brightness.shape, 3), dtype=np.uint8)
    color[:] = target
    out = np.dstack([color, alpha])
    Image.fromarray(out, mode="RGBA").save(out_path)

# logo branca: o quadriculado escuro costuma ficar abaixo de ~115 de brilho
extract_logo("logo-branca-bruta.png", "logo-branca.png", target=(255,255,255), low=0, high=115, invert=False)
# logo preta: o quadriculado claro costuma ficar acima de ~108 de brilho
extract_logo("logo-preta-bruta.png", "logo-preta.png", target=(0,0,0), low=108, high=255, invert=True)
```

Os limiares (115 / 108) são um ponto de partida — abra a imagem original, veja os tons de cinza do quadriculado (geralmente duas tonalidades, uma mais clara e uma mais escura) e ajuste `high`/`low` para ficar entre o quadriculado e a cor real da logo. Sempre confira o resultado composto sobre um fundo escuro E um fundo claro antes de usar.
