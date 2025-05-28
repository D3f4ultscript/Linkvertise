# D3f4ult Hub Key System

Dieses Repository enthält das Key-System für D3f4ult Hub.

## Funktionen

- 10-Sekunden-Timer vor der Generierung eines Schlüssels
- Generierung eines zufälligen 30-Zeichen-Schlüssels
- Schlüssel sind 6 Stunden gültig
- Schlüssel sind an einen bestimmten Roblox-Benutzer gebunden
- Integrierte Schlüsselüberprüfungs-API

## Lokale Entwicklung

1. Stelle sicher, dass Node.js (Version 14 oder höher) installiert ist
2. Klone dieses Repository
3. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```
4. Starte den Entwicklungsserver:
   ```bash
   npm run dev
   ```
5. Öffne http://localhost:3000 in deinem Browser

## Hosting auf Vercel

Du kannst diese Anwendung einfach auf Vercel hosten:

1. Erstelle ein Konto auf [Vercel](https://vercel.com/)
2. Verbinde dein GitHub-Repository mit Vercel
3. Wähle das Repository aus und deploye es

## Deployment auf deiner Domain

1. Registriere eine Domain (z.B. d3f4ult-hub-keys.xyz)
2. Verbinde die Domain mit deinem Vercel-Projekt
3. Aktualisiere die URL in D3f4ult Hub.lua, um deine Domain zu verwenden

## API-Endpunkte

- `GET /api/generate-key` - Generiert einen neuen Schlüssel
- `GET /api/validate-key?key=YOUR_KEY&userId=ROBLOX_USER_ID` - Überprüft einen Schlüssel

## Produktionsumgebung

In einer Produktionsumgebung solltest du:

1. Eine echte Datenbank anstelle des In-Memory-Speichers verwenden (z.B. MongoDB)
2. Bessere Fehlerbehandlung und Logging implementieren
3. Rate-Limiting hinzufügen, um Missbrauch zu verhindern 