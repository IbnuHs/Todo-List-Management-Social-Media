/**
 * @swagger
 * /api/todo/create:
 *   post:
 *     summary: Create New Todo
 *     description: Membuat Todo Baru
 *     tags:
 *       - Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *               titleContent:
 *                 type: string
 *               dueOn:
 *                 type: date
 *                 example : 1999-09-29
 *     responses:
 *       201:
 *         description: Todo Successfully Created
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Todo Successfully Created
 *       400:
 *         description: Please fill in all fields
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Please fill in all fields
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/todo/user:
 *   get:
 *     summary: Mengambil Data Todo
 *     description: Mengambil data Todo berdasarkan userId
 *     tags:
 *       - Todo
 *     responses:
 *       200:
 *         description: Todo Successfully Created
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Todo Successfully Created
 *       400:
 *         description: Please fill in all fields
 *         content:
 *           application/json:
 *              oneOf :
 *                - example:
 *                   status: 400
 *                   message: Please fill in all fields
 *                - example :
 *                   status : 400
 *                   message : Please Input User Id
 *
 *       500:
 *         description: Jika Terjadi  error pada server
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Mengambil Data Todo berdasarkan id
 *     description: Mengambil data Todo berdasarkan id todo
 *     tags:
 *       - Todo
 *     parameters:
 *       - in : path
 *         name : id
 *         required : true
 *         schema :
 *           type : string
 *         description : Mengambil data Todo berdasarkan id Todo
 *     responses:
 *       201:
 *         description: Mengambil Todo berdasarkan Id
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Todo Successfully Created
 *       400:
 *         description: jika user tidak memasukkan id todo yang di cari
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Invalid Id
 *       404:
 *         description: jika tidak menemukan todo yang di cari
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Todos Not Found
 *       500:
 *         description: Jika Terjadi  error pada server
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/todo/updateStatus:
 *   patch:
 *     summary: Mengubah status Todo
 *     description: Mengubah status laporan dengan value yang telah ditentukan yaitu ["PENDING", "COMPLETE", "OVERDUE"].
 *     tags:
 *       - Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID dari todo yang ingin diperbarui
 *               status:
 *                 type: enum
 *                 enum: ["PENDING", "COMPLETE", "OVERDUE"]
 *                 description: Status baru dari todo
 *     responses:
 *       200:
 *         description: Berhasil memperbarui status todo
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Todo Update Successfully
 *       400:
 *         description: Jika ID tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Invalid Id
 *       404:
 *         description: Jika todo tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Todos Not Found
 *       500:
 *         description: Jika terjadi error pada server
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */
/**
 * @swagger
 * /api/todo/{id}:
 *   patch:
 *     summary: Mengedit Todo
 *     description: Mengubah laporan yang telah dibuat sebelumnya.
 *     tags:
 *       - Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id :
 *                 type : string
 *               platform:
 *                 type: string
 *               titleContent:
 *                 type: string
 *               dueOn:
 *                 type: date
 *                 example : 1999-09-29
 *
 *     responses:
 *       200:
 *         description: Berhasil mengedit todo
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success Update Todo
 *       400:
 *         description: Jika id, platform atau dueOn kosong
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Please Fill id, platform, titleContent, dueOn
 *       404:
 *         description: Jika todo tidak ditemukan
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Todos Not Found, Invalid Id
 *       500:
 *         description: Jika terjadi error pada server
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Delete Todo
 *     description: Menghapus Todo yang telah di buat
 *     tags:
 *       - Todo
 *     parameters:
 *       - in : path
 *         name : id
 *         required : true
 *         schema :
 *           type : string
 *         description : Menghapus Todo yang telah dibuat sebelumnya
 *     responses:
 *       200:
 *         description: Deleted Todo
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Todos Delete Succesfully
 *       400:
 *         description:  Jika user tidak memasukkan id todo yang ingin dihapus
 *         content:
 *           application/json:
 *                example:
 *                   status: 400
 *                   message: Please Input Todos Id
 *       404:
 *         description:  Jika user tidak memasukkan id todo yang tidak valid
 *         content:
 *           application/json:
 *                example:
 *                   status: 404
 *                   message: Todos not Found
 *       500:
 *         description: Jika Terjadi  error pada server
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: Internal Server Error
 */
