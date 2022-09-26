
export interface Intake {
  date: Date,
  _id: string,
}

export interface Medicine {
  _id: string,
  frequency: number,
  intake: [Intake]

}