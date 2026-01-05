/*
  Warnings:

  - Added the required column `apellidoMaterno` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellidoPaterno` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apellidoMaterno" TEXT NOT NULL,
ADD COLUMN     "apellidoPaterno" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "usuario" TEXT NOT NULL;
