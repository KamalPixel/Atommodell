# Periodesystem-app

Hei! Dette er et prosjekt jeg har laget i første året på dataingeniør. Det er basically en interaktiv periodesystem-app hvor du kan lære om grunnstoffer og teste deg selv med en quiz.

## Hva er dette?

Jeg har alltid synes kjemi var litt vanskelig å huske, så jeg tenkte det hadde vært kult å lage noe som gjør det lettere å lære. Appen har:

- **Periodesystemet** - Du kan hover over alle grunnstoffene og se info om dem
- **Søkefunksjon** - Søk etter grunnstoffer og filtrer på kategori osv
- **Quiz** - Test deg selv! Har flere vanskelighetsgrader
- **Statistikk** - Se hvor bra (eller dårlig lol) du gjør det over tid

## Tech stack

Brukte dette:
- React med TypeScript (lærte TypeScript i høst, synes det er ganske nice)
- Vite som build tool
- Tailwind CSS for styling (mye lettere enn vanlig CSS imo)
- p5.js for den kule animasjonen av elektronene
- shadcn/ui for buttons og sånt

## Hvordan kjøre prosjektet

1. Klon repoet
```bash
git clone [url til repoet]
cd atom
```

2. Installer dependencies
```bash
npm install
```

3. Start dev server
```bash
npm run dev
```

4. Åpne http://localhost:5173 i browseren

## Mappestruktur

```
src/
├── components/     <- React komponenter
├── hooks/          <- Custom hooks (useQuiz osv)
├── types/          <- TypeScript typer
├── data/           <- Data om grunnstoffene
└── pages/          <- Sidene i appen
```

## Ting jeg vil legge til senere (kanskje)

- [ ] Login sånn at man kan lagre progress
- [ ] Highscore-liste
- [ ] Flere quiz-typer
- [ ] Gjøre det til en PWA


