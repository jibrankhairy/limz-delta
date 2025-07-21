import mongoose, { Schema } from 'mongoose';

// Skema ini mendefinisikan struktur untuk objek 'coverData'
// Opsi `{ _id: false }` mencegah Mongoose membuat ID terpisah untuk sub-dokumen ini
const CoverDataSchema = new Schema({
  nomorFpps: { type: String, default: '' },
  customer: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  contactName: { type: String, default: '' },
  email: { type: String, default: '' },
  subjects: [String],
  sampleTakenBy: [String],
  receiveDate: Date,
  analysisDateStart: Date,
  analysisDateEnd: String,
  reportDate: String,
  signatureUrl: String,
  directorName: String,
  certificateNo: String,
  showKanLogo: { type: Boolean, default: true },
}, { _id: false });

const ReportSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    coverData: CoverDataSchema,
    activeTemplates: {
      type: Array,
      default: [],
    },
    // INI YANG PALING PENTING: Pastikan field ini ada
    status: {
      type: String,
      default: 'process', 
      enum: ['process', 'done'], 
    },
  },
  {
    timestamps: true,
    _id: false, 
  }
);


export default mongoose.models.Report || mongoose.model('Report', ReportSchema);