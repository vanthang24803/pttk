-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Lecturers', 'DeputyDean', 'Dean');

-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('Master', 'Doctorate', 'AssociateProfessor', 'Professor');

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(10),
    "firstMidName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(10),
    "address" VARCHAR(255),
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "position" "Position" NOT NULL DEFAULT 'Lecturers',
    "degree" "Degree" NOT NULL DEFAULT 'Master',
    "salaryScale" INTEGER NOT NULL DEFAULT 0,
    "benefitSalary" INTEGER NOT NULL DEFAULT 0,
    "baseSalary" BIGINT NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL DEFAULT 0,
    "workDay" INTEGER NOT NULL DEFAULT 0,
    "offDay" INTEGER NOT NULL DEFAULT 0,
    "benefit" INTEGER NOT NULL DEFAULT 0,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherDepartment" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "TeacherDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeacherDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE INDEX "TeacherDepartment_teacherId_idx" ON "TeacherDepartment"("teacherId");

-- CreateIndex
CREATE INDEX "TeacherDepartment_departmentId_idx" ON "TeacherDepartment"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherDepartment_teacherId_departmentId_key" ON "TeacherDepartment"("teacherId", "departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherDepartments_AB_unique" ON "_TeacherDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherDepartments_B_index" ON "_TeacherDepartments"("B");

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDepartment" ADD CONSTRAINT "TeacherDepartment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDepartment" ADD CONSTRAINT "TeacherDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDepartments" ADD CONSTRAINT "_TeacherDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDepartments" ADD CONSTRAINT "_TeacherDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
