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
  return (await xml2js.parseStringPromise(decodedText, {
    trim: true,
    explicitArray: false,
    mergeAttrs: true,
    attrNameProcessors: [
      function addPrefix(name) {
        return `$${name}`;
      },
    ],
  })) as Promise<string>;
}

async function createDirectory(directoryPath: string) {
  try {
    await fs.access(directoryPath, fs.constants.W_OK);
  } catch (accessError) {
    try {
      await fs.mkdir(directoryPath).catch(console.warn);
    } catch (mkdirError) {
      throw new Error(
        `Cannot access directory ${directoryPath}
        ${JSON.stringify(accessError)}
        ${JSON.stringify(mkdirError)}
        `,
      );
    }
  }
}

async function main() {
  const directoryPath = "./generated";
  const reportText = await fetchReport();
  const reportObj = await parseXml(reportText);
  await createDirectory(directoryPath);
  await fs.writeFile(
    `${directoryPath}/bollettino_utenti.json`,
    JSON.stringify(reportObj),
  );
}

main().catch(console.error);
