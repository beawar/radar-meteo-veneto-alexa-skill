#!/usr/bin/env ts-node
import fs from "node:fs/promises";
import he from "he";
import xml2js from "xml2js";

async function fetchReport() {
  const url =
    "https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml";
  const response = await fetch(url);
  return await response.text();
}

async function parseXml(text: string) {
  const decodedText = he.decode(text);
  return await xml2js.parseStringPromise(decodedText, {
    trim: true,
    explicitArray: false,
    mergeAttrs: true,
    attrNameProcessors: [
      function addPrefix(name) {
        return `$${name}`;
      },
    ],
  }) as Promise<string>;
}

async function main() {
  try {
    const reportText = await fetchReport();
    const reportObj = await parseXml(reportText);
    await fs.writeFile(
      "./generated/bollettino_utenti.json",
      JSON.stringify(reportObj)
    );
  } catch (err) {
    console.log(err);
  }
}

main().catch(console.error)
