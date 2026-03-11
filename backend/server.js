require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


const app = express()

app.use(cors())
app.use(express.json())

// IMPORT ROUTES
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const adminRoutes = require("./routes/adminRoutes")

// USE ROUTES
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/admin", adminRoutes)

// SERVE UPLOADS FOLDER STATICALLY
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// CONNECT MONGODB
// Use Google's Public DNS to resolve MongoDB Atlas SRV records
// This fixes 'ECONNREFUSED _mongodb._tcp.cluster' errors on some Windows machines
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err))

// SERVER
app.listen(process.env.PORT, () => {
  console.log("Server running")
})