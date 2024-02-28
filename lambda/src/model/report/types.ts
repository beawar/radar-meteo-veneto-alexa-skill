export interface Report {
  previsioni: Previsioni;
}

export interface Previsioni {
  data_emissione: Data;
  data_aggiornamento: Data;
  meteogrammi: Meteogrammi;
  bollettini: Bollettini;
}

export interface Bollettini {
  bollettino: Bollettino[];
}

export interface Bollettino {
  evoluzionegenerale: string;
  avviso: string;
  fenomeniparticolari: string;
  giorno: Giorno[];
  _bollettinoid: string;
  _name: string;
  _title: string;
  quota_zero_termico?: QuotaZeroTermico;
  previsioni_localita?: PrevisioniLocalita;
}

export interface Giorno {
  img: ImgElement[] | ImgElement;
  text: string;
  _data: string;
}

export interface ImgElement {
  _src: string;
  _caption: string;
}

export interface PrevisioniLocalita {
  localita: Localita[];
  _data: string;
}

export interface Localita {
  tmin: Neve;
  tmax: Neve;
  scadenza: LocalitaScadenza[];
  pioggia: Neve;
  neve: Neve;
  _nome: string;
}

export interface Neve {
  _value: string;
}

export interface LocalitaScadenza {
  cielo: Neve;
  probabilita_pioggia: Neve;
  _data: string;
}

export interface QuotaZeroTermico {
  previsione: QuotaZeroTermicoPrevisione[];
}

export interface QuotaZeroTermicoPrevisione {
  _data: string;
  __text: string;
}

export interface Data {
  _date: string;
}

export interface Meteogrammi {
  meteogramma: Meteogramma[];
}

export interface Meteogramma {
  scadenza: MeteogrammaScadenza[];
  _zoneid: string;
  _name: string;
}

export interface MeteogrammaScadenza {
  previsione: ScadenzaPrevisione[];
  _data: string;
}

export interface ScadenzaPrevisione {
  _title: Title;
  _type: Type;
  _value: string;
}

export enum Title {
  Attendibilita = "Attendibilita'",
  Cielo = "Cielo",
  Precipitazioni = "Precipitazioni",
  ProbabilitaPrecipitazione = "Probabilita' precipitazione",
  QuotaNeve = "Quota neve",
  Simbolo = "Simbolo",
  Temperatura = "Temperatura",
  Temperatura1500M = "Temperatura 1500m",
  Temperatura2000M = "Temperatura 2000m",
  Temperatura3000M = "Temperatura 3000m",
  Vento = "Vento",
}

export enum Type {
  Image = "image",
  Text = "text",
}
