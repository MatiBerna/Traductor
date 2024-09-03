import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/database'

interface TraductionAttributes {
  id: number
  text: string
  language: 'english' | 'español'
}

export class Traduction extends Model<TraductionAttributes> {
  public id!: number
  public text!: string
  public language!: 'english' | 'español'
}

Traduction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.ENUM('english', 'español'),
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'traduction',
    timestamps: false,
  }
)
