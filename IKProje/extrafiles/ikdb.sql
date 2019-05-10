USE [ikdb]
GO
/****** Object:  User [ikuser]    Script Date: 03/21/2016 22:03:06 ******/
CREATE USER [ikuser] FOR LOGIN [ikuser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[CCompanyInfo]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CCompanyInfo](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](max) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CApplications]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CApplications](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationName] [nvarchar](max) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GEducationLevel]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GEducationLevel](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[EducationLevelName] [nvarchar](255) NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UCVs]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UCVs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CVName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UCoverLetters]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UCoverLetters](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CoverLetterName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UBlockedCompanies]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UBlockedCompanies](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyID] [int] NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USavedSearches]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USavedSearches](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SearchName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UMessages]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UMessages](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NULL,
	[Subject] [nvarchar](max) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK__uMessage__3214EC27793DFFAF] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UInvitations]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UInvitations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[InvitationID] [int] NULL,
	[IsAccepted] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UFiles]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UFiles](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FileName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GCountries]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GCountries](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CountryName] [nvarchar](max) NULL,
	[ShortCode] [nvarchar](3) NULL,
	[PhoneCode] [nvarchar](5) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[GCountries] ON
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (2, N'Andorra', N'AD', N'376', N'2edf2cc62ac54b89b161f53832223b41', 1, 0, N'Andorra')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (3, N'Armenia', N'AM', N'374', N'952fd1ee05cb4724923b2315a7a51a78', 1, 0, N'Armenia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (4, N'Aruba', N'AW', N'297', N'464a406f601c4d03acefaa73919ab7f3', 1, 0, N'Aruba')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (5, N'Australia', N'AU', N'61', N'e061ac44f06041ec824e0f8ae2db1752', 1, 0, N'Australia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (6, N'Austria', N'AT', N'43', N'e1295a6850ce436cb9269b0370c3c06b', 1, 0, N'Austria')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (7, N'Azerbaijan', N'AZ', N'994', N'8da260e6dac74c558b2e2234d95ea868', 1, 0, N'Azerbaijan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (8, N'Bahamas', N'BS', N'1242', N'1d3f75e0e74b4b46b74fbe5b7b560de4', 1, 0, N'Bahamas')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (9, N'Algeria', N'DZ', N'213', N'f7d2eafb7a7b4447ac780d6beb6dc081', 1, 0, N'Algeria')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (10, N'Bangladesh', N'BD', N'880', N'9a43ded2eed742a0a3b980acce224754', 1, 0, N'Bangladesh')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (11, N'Barbados', N'BB', N'1246', N'45cfec0c8df94d7c89db1f9bde7ae5c7', 1, 0, N'Barbados')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (12, N'Belarus', N'BY', N'375', N'de45fe94a42e4ceeba32740f73ef169e', 1, 0, N'Belarus')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (13, N'Belgium', N'BE', N'32', N'8bb1373847904f0d8df5e193da8f6b6d', 1, 0, N'Belgium')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (14, N'Belize', N'BZ', N'501', N'edfd5721cf9549438851a4b9426d548a', 1, 0, N'Belize')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (15, N'Benin', N'BJ', N'229', N'4c2bff8f8b0f4124b6eeb3b5df71aa8f', 1, 0, N'Benin')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (16, N'Bermuda', N'BM', N'1441', N'3995052fff9c4a1795c17d840dc4dd4c', 1, 0, N'Bermuda')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (17, N'Bhutan', N'BT', N'975', N'a22bad92f2fa461cba8c026ec0a4cab9', 1, 0, N'Bhutan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (18, N'Bolivia', N'BO', N'591', N'2f64953f3bd04dd09e33212bbebda780', 1, 0, N'Bolivia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (19, N'Bosnia Herzegovina', N'BA', N'387', N'80b29b5b14c447a1aae460297651deb2', 1, 0, N'Bosnia-Herzegovina')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (20, N'Botswana', N'BW', N'267', N'caad92438cf94dde95d55025a9133b19', 1, 0, N'Botswana')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (21, N'Brazil', N'BR', N'55', N'88c996eaadbd4b059988445acca047aa', 1, 0, N'Brazil')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (22, N'Brunei', N'BN', N'673', N'386e0245d0e644be83aa9ad277584ffb', 1, 0, N'Brunei')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (23, N'Bulgaria', N'BG', N'359', N'87664ddfd5db4578948ec83c014a53c7', 1, 0, N'Bulgaria')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (24, N'Burkina Faso', N'BF', N'226', N'6aaa9ba29bf5471ab7fe6c90930233be', 1, 0, N'Burkina-Faso')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (25, N'Burundi', N'BI', N'257', N'519d84613fbb49e580dde8d10d28afdc', 1, 0, N'Burundi')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (26, N'Cambodia', N'KH', N'855', N'258f0d61fb7b4120ba7ac57b88b45f6f', 1, 0, N'Cambodia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (27, N'Cameroon', N'CM', N'237', N'54dc4069a14e49ab842c60144f235486', 1, 0, N'Cameroon')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (28, N'Canada', N'CA', N'1', N'5ba8f0227ddd43e9959b21466ec074d6', 1, 0, N'Canada')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (29, N'Cape Verde Islands', N'CV', N'238', N'5e461f9997d54f19abdc66b466137dc3', 1, 0, N'Cape-Verde-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (30, N'Cayman Islands', N'KY', N'1345', N'ce1ed8705c9e4d8c9052ca91efad1c83', 1, 0, N'Cayman-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (31, N'Central African Republic', N'CF', N'236', N'60bda0a29fdc4bfda63b2a11436df7ec', 1, 0, N'Central-African-Republic')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (32, N'Chile', N'CL', N'56', N'548f31a6087548edb68bec20b9ebf793', 1, 0, N'Chile')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (33, N'China', N'CN', N'86', N'9396f0aadef04152bb80808654d4cf20', 1, 0, N'China')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (34, N'Colombia', N'CO', N'57', N'5e3caac6e07246d09cc603220c6f6f9f', 1, 0, N'Colombia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (35, N'Comoros', N'KM', N'269', N'b913693ee3ee46088564a8d616fcdce4', 1, 0, N'Comoros')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (36, N'Congo', N'CG', N'242', N'90762f7a2efd4d56b6b62c40f2149b4d', 1, 0, N'Congo')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (37, N'Cook Islands', N'CK', N'682', N'9b46cbf6fcfe4fd9b615a980937c5faf', 1, 0, N'Cook-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (38, N'Costa Rica', N'CR', N'506', N'ec9aa5020ce746519fb4cffe0ecf67ed', 1, 0, N'Costa-Rica')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (39, N'Croatia', N'HR', N'385', N'1acc84211b14470298b3213588cf9a9b', 1, 0, N'Croatia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (40, N'Cuba', N'CU', N'53', N'd9150d7123664991b40b949071381d1a', 1, 0, N'Cuba')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (41, N'Cyprus North', N'CY', N'90392', N'283dc78002d84f978ed738f53de5fbe4', 1, 0, N'Cyprus-North')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (42, N'Cyprus South', N'CY', N'357', N'3df96d8a61ac49a8b60784206f373127', 1, 0, N'Cyprus-South')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (43, N'Czech Republic', N'CZ', N'42', N'd8389b4e7a5940d386509a3e7ef70174', 1, 0, N'Czech-Republic')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (44, N'Denmark', N'DK', N'45', N'996c231ad920441383e1307b90ed0c99', 1, 0, N'Denmark')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (45, N'Djibouti', N'DJ', N'253', N'4d9e5ccda97a4b39a335c4d90555a48b', 1, 0, N'Djibouti')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (46, N'Dominica', N'DM', N'1809', N'70dec81649284072a1c33ba48ce48eaa', 1, 0, N'Dominica')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (47, N'Dominican Republic', N'DO', N'1809', N'bd81930b180d4ae7b08c0bb7089ec04e', 1, 0, N'Dominican-Republic')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (48, N'Ecuador', N'EC', N'593', N'9d35155457034808b81255b43f1f496e', 1, 0, N'Ecuador')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (49, N'Egypt', N'EG', N'20', N'f22930f91e444a84b768907c0c9c8ddc', 1, 0, N'Egypt')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (50, N'El Salvador', N'SV', N'503', N'c78e75a8696f4eca833e80021cb10e5d', 1, 0, N'El-Salvador')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (51, N'Equatorial Guinea', N'GQ', N'240', N'96ebbcee287b4bd49ca810c20974b964', 1, 0, N'Equatorial-Guinea')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (52, N'Eritrea', N'ER', N'291', N'92a05b4e01c34c7f9ab4d68b96bed943', 1, 0, N'Eritrea')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (53, N'Estonia', N'EE', N'372', N'89efff39153440d5967b8903e200848f', 1, 0, N'Estonia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (54, N'Ethiopia', N'ET', N'251', N'167ef35a723f4e3685b3d3cf863efbb6', 1, 0, N'Ethiopia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (55, N'Falkland Islands', N'FK', N'500', N'4e8256500cfb4b7c9d21bbb42cbbcf58', 1, 0, N'Falkland-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (56, N'Faroe Islands', N'FO', N'298', N'e1beb638467c4f2690644d7358d27119', 1, 0, N'Faroe-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (57, N'Fiji', N'FJ', N'679', N'67640cfa46024fdc9b874d4456b1ffb9', 1, 0, N'Fiji')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (58, N'Finland', N'FI', N'358', N'0d80780e472b47d6b244c434cad7783d', 1, 0, N'Finland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (59, N'France', N'FR', N'33', N'48746feeaa3042848fe85093fcae644b', 1, 0, N'France')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (60, N'French Guiana', N'GF', N'594', N'db6bc1e96257479c8a242aca7602d5ce', 1, 0, N'French-Guiana')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (61, N'French Polynesia', N'PF', N'689', N'acf63249dc6d4de487502e4c95d0a7fd', 1, 0, N'French-Polynesia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (62, N'Gabon', N'GA', N'241', N'bda90b7972dc48a9ac4b3c8967f41346', 1, 0, N'Gabon')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (63, N'Gambia', N'GM', N'220', N'41f2e6cc04fe490e9d8645a45ad1e218', 1, 0, N'Gambia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (64, N'Georgia', N'GE', N'7880', N'3e2206a5b07e4e039c872dbb8e5dc610', 1, 0, N'Georgia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (65, N'Germany', N'DE', N'49', N'3bd7c31e384242149b5034e66e9f776a', 1, 0, N'Germany')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (66, N'Ghana', N'GH', N'233', N'835e8ba1ed194ab98d5c19bb4717d43d', 1, 0, N'Ghana')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (67, N'Gibraltar', N'GI', N'350', N'20896e215dc8484cbb85f9a7dd345858', 1, 0, N'Gibraltar')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (68, N'Greece', N'GR', N'30', N'ecece3581a6449d988682b0fa9851ea6', 1, 0, N'Greece')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (69, N'Greenland', N'GL', N'299', N'0d6c9b007dc04827810acf2e630f3564', 1, 0, N'Greenland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (70, N'Grenada', N'GD', N'1473', N'b50145889ab7481887d9b466923bd3e3', 1, 0, N'Grenada')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (71, N'Guadeloupe', N'GP', N'590', N'451dd6a25e58495da203a9cdf2944d9f', 1, 0, N'Guadeloupe')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (72, N'Guam', N'GU', N'671', N'9fb3f2b61ad44cb795ab79b7dd6d8f50', 1, 0, N'Guam')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (73, N'Guatemala', N'GT', N'502', N'3df4066fc40545a88d5ec63345896dda', 1, 0, N'Guatemala')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (74, N'Guinea', N'GN', N'224', N'31513bb8f2914429b913cdf390f3f241', 1, 0, N'Guinea')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (75, N'Guinea - Bissau', N'GW', N'245', N'182ea9d6ad3c42f29cf6c86c017579a1', 1, 0, N'Guinea-Bissau')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (76, N'Guyana', N'GY', N'592', N'dd0de63a95744993beb6f4075957fa37', 1, 0, N'Guyana')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (77, N'Haiti', N'HT', N'509', N'f14ae9e309d0499893220811b2a786d3', 1, 0, N'Haiti')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (78, N'Honduras', N'HN', N'504', N'49c249fbf596429d8ba5e5cabd12ffe5', 1, 0, N'Honduras')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (79, N'Hong Kong', N'HK', N'852', N'8537fcd4054b4f9981c274e9e3e12e29', 1, 0, N'Hong-Kong')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (80, N'Hungary', N'HU', N'36', N'ea3b0d21bc514b5bada2c08ebd645675', 1, 0, N'Hungary')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (81, N'Iceland', N'IS', N'354', N'9f71736d11144b3d897afe7945ed8329', 1, 0, N'Iceland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (82, N'India', N'IN', N'91', N'879a8c50bdcb4619b7f6ef00e3f8fec6', 1, 0, N'India')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (83, N'Indonesia', N'ID', N'62', N'4288f6ac98e94feb8e174f84f0e91792', 1, 0, N'Indonesia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (84, N'Argentina', N'AR', N'54', N'b84715807fd34fe5aa324ec56926976e', 1, 0, N'Argentina')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (85, N'Iraq', N'IQ', N'964', N'4e6ff4a6821e4aebae9925cb1e183d91', 1, 0, N'Iraq')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (86, N'Ireland', N'IE', N'353', N'ba77e88219274cd79704102407a0ebd5', 1, 0, N'Ireland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (87, N'Israel', N'IL', N'972', N'0c9d69166364480b8054e4293b935184', 1, 0, N'Israel')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (88, N'Italy', N'IT', N'39', N'7ad17d30eb104395a02ea9ce1b4511e3', 1, 0, N'Italy')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (89, N'Jamaica', N'JM', N'1876', N'60ea3fc42eee4d0aa8c498f8eea8a86c', 1, 0, N'Jamaica')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (90, N'Japan', N'JP', N'81', N'c1f7708fc4324522b555c51f5b7fa38b', 1, 0, N'Japan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (91, N'Jordan', N'JO', N'962', N'8696eaf02e994f498885a70044d67efb', 1, 0, N'Jordan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (92, N'Kazakhstan', N'KZ', N'7', N'55edf1e16a414f5597f79af2a83aa216', 1, 0, N'Kazakhstan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (93, N'Kenya', N'KE', N'254', N'f05ad681139a49889d850df970256474', 1, 0, N'Kenya')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (94, N'Kiribati', N'KI', N'686', N'63c813ffaba844eeb1ad1b85d828249c', 1, 0, N'Kiribati')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (95, N'Korea North', N'KP', N'850', N'ebf4d02a13544f478c54170d6d0adc67', 1, 0, N'Korea-North')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (96, N'Korea South', N'KR', N'82', N'4c616025200d4050a445159e2734b6b8', 1, 0, N'Korea-South')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (97, N'Kuwait', N'KW', N'965', N'bccf5037ac6d4bfa80d64bb715ca4fde', 1, 0, N'Kuwait')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (98, N'Kyrgyzstan', N'KG', N'996', N'64a1b669a0b14b3fa1a0fff3f04ca43c', 1, 0, N'Kyrgyzstan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (99, N'Laos', N'LA', N'856', N'2820ad18226b4c14986a7ba7547a5d10', 1, 0, N'Laos')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (100, N'Latvia', N'LV', N'371', N'c5141470d2cc4a7bbc903d6a4d68c523', 1, 0, N'Latvia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (101, N'Lebanon', N'LB', N'961', N'81b9993b7eaf4b55862c2d925c57cf8f', 1, 0, N'Lebanon')
GO
print 'Processed 100 total records'
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (102, N'Lesotho', N'LS', N'266', N'c3950f4374a049329ac46e1d04e3c423', 1, 0, N'Lesotho')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (103, N'Liberia', N'LR', N'231', N'8515562e2e4a4c4baa901890bb3258de', 1, 0, N'Liberia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (104, N'Libya', N'LY', N'218', N'435455d1d08f4888a8333828d9018ed8', 1, 0, N'Libya')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (105, N'Liechtenstein', N'LI', N'417', N'74158a2a48af4ce39fd50936fdfc1d78', 1, 0, N'Liechtenstein')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (106, N'Lithuania', N'LT', N'370', N'3519d6910b884faba60e41de88f7dfbc', 1, 0, N'Lithuania')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (107, N'Luxembourg', N'LU', N'352', N'5acd3c21d26644e8af212a34caa3d473', 1, 0, N'Luxembourg')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (108, N'Macao', N'MO', N'853', N'4bb8bf421bf94fd7ab8e4924cd3ae95a', 1, 0, N'Macao')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (109, N'Macedonia', N'MK', N'389', N'640fdb446e234fdcb6ffa042ac3624a7', 1, 0, N'Macedonia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (110, N'Madagascar', N'MG', N'261', N'fda385ca82a445e99d73c17005b6beb5', 1, 0, N'Madagascar')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (111, N'Malawi', N'MW', N'265', N'ec56d5df94734fee9e3a83e2a9a75263', 1, 0, N'Malawi')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (112, N'Malaysia', N'MY', N'60', N'05d7177064264829bb257681102e2e38', 1, 0, N'Malaysia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (113, N'Maldives', N'MV', N'960', N'752bdb65242646e5bf575cd33de729c9', 1, 0, N'Maldives')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (114, N'Mali', N'ML', N'223', N'a7bf3e8b27aa45bc84e3ba5b54d4e09b', 1, 0, N'Mali')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (115, N'Malta', N'MT', N'356', N'82ce04914266412990b94aa0df07ede8', 1, 0, N'Malta')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (116, N'Marshall Islands', N'MH', N'692', N'65e14855eaa44346a7adffbe623a6e40', 1, 0, N'Marshall-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (117, N'Martinique', N'MQ', N'596', N'c86b302ef1514d21bdbdb104b2d4cf66', 1, 0, N'Martinique')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (118, N'Mauritania', N'MR', N'222', N'a0d50fc279f042fab663f972224581e2', 1, 0, N'Mauritania')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (119, N'Mayotte', N'YT', N'269', N'2a1e9ae2dbd548a8afedf5ba563e9a68', 1, 0, N'Mayotte')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (120, N'Mexico', N'MX', N'52', N'0a99e4d4ffdb4498a3693f181439d266', 1, 0, N'Mexico')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (121, N'Micronesia', N'FM', N'691', N'c8ad3a7b42114f528b5437698c0cd193', 1, 0, N'Micronesia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (122, N'Moldova', N'MD', N'373', N'fda2aaa6e56840b8817d10bb106ee4d1', 1, 0, N'Moldova')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (123, N'Monaco', N'MC', N'377', N'd55fc02af87e4e08b73c66bb2bb80a26', 1, 0, N'Monaco')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (124, N'Mongolia', N'MN', N'976', N'100f560b147b4b828a0f0d465de8bcbc', 1, 0, N'Mongolia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (125, N'Montserrat', N'MS', N'1664', N'de3de6a613d04dfd9712623b9c42b239', 1, 0, N'Montserrat')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (126, N'Morocco', N'MA', N'212', N'9b66a550ecba4e258db5a76a889e0cc5', 1, 0, N'Morocco')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (127, N'Mozambique', N'MZ', N'258', N'0e5a79376eab430ea916089dd63f32e6', 1, 0, N'Mozambique')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (128, N'Myanmar', N'MN', N'95', N'39ac5e34879841cbb480b07a632124e3', 1, 0, N'Myanmar')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (129, N'Namibia', N'NA', N'264', N'd8e24adefccc4ed280270a4676d42abf', 1, 0, N'Namibia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (130, N'Nauru', N'NR', N'674', N'886d75ef349b41129e4a6dc5fa91f9ab', 1, 0, N'Nauru')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (131, N'Nepal', N'NP', N'977', N'37612e1201a74341999ac63d6dbc72b8', 1, 0, N'Nepal')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (132, N'Netherlands', N'NL', N'31', N'71db125df14f4452b45d3c8026943824', 1, 0, N'Netherlands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (133, N'New Caledonia', N'NC', N'687', N'3fbd7bef892c455caf2f853f470932a9', 1, 0, N'New-Caledonia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (134, N'New Zealand', N'NZ', N'64', N'75d96d41689c4f1f81076ba661e4a4ec', 1, 0, N'New-Zealand')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (135, N'Nicaragua', N'NI', N'505', N'c5b6d20eaf3b43bfa75678e735f8b1ee', 1, 0, N'Nicaragua')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (136, N'Iran', N'IR', N'98', N'bfeb990960fa4412ab5a91baad498a70', 1, 0, N'Iran')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (137, N'Nigeria', N'NG', N'234', N'af590d7d55e34369a1ba5fe6810a71d5', 1, 0, N'Nigeria')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (138, N'Niue', N'NU', N'683', N'c2af85c276ee4b08a214f97c6a15caef', 1, 0, N'Niue')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (139, N'Norfolk Islands', N'NF', N'672', N'3c08c64f23d344f4b65b3ae7163b9c96', 1, 0, N'Norfolk-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (140, N'Northern Marianas', N'NP', N'670', N'f31bfcf8f73247f6abcd4e6da99859b1', 1, 0, N'Northern-Marianas')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (141, N'Norway', N'NO', N'47', N'e10f27fcbc0b4ed292894051c80719ef', 1, 0, N'Norway')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (142, N'Oman', N'OM', N'968', N'dd91ae8975644e58b7216a6c66f81f73', 1, 0, N'Oman')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (143, N'Palau', N'PW', N'680', N'd6c9019d20e84989ad30149f039688a5', 1, 0, N'Palau')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (144, N'Panama', N'PA', N'507', N'adfa6bb81cf74c9a8f4664190feef4e7', 1, 0, N'Panama')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (145, N'Papua New Guinea', N'PG', N'675', N'cb1745780c8c43219b7e261460f7b476', 1, 0, N'Papua-New-Guinea')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (146, N'Paraguay', N'PY', N'595', N'b74c20b89f6743ec9c329167c3d621b2', 1, 0, N'Paraguay')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (147, N'Peru', N'PE', N'51', N'c1a1e8c59b7c420fadee1429b053f0cb', 1, 0, N'Peru')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (148, N'Philippines', N'PH', N'63', N'b7ab16585fca410f83565c5042748a37', 1, 0, N'Philippines')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (149, N'Poland', N'PL', N'48', N'b9a8cb2f6bf54ac282baca7399aef630', 1, 0, N'Poland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (150, N'Portugal', N'PT', N'351', N'353e1dcefbb34e479721e673cea3c065', 1, 0, N'Portugal')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (151, N'Puerto Rico', N'PR', N'1787', N'9f113efca7674cb98d072ee1b6b2f4ec', 1, 0, N'Puerto-Rico')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (152, N'Qatar', N'QA', N'974', N'03d2b9fe3f6f466a8c52a04705d4e718', 1, 0, N'Qatar')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (153, N'Reunion', N'RE', N'262', N'2cc9172143094a2d914c8f52134c0c53', 1, 0, N'Reunion')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (154, N'Romania', N'RO', N'40', N'012fec88dcce414a8374578f7ced5bb4', 1, 0, N'Romania')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (155, N'Russia', N'RU', N'7', N'92f7d47bccf7432e8be2be5109dac878', 1, 0, N'Russia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (156, N'Rwanda', N'RW', N'250', N'e3f9c53755fc4dfc9a242459c76ca62c', 1, 0, N'Rwanda')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (157, N'San Marino', N'SM', N'378', N'2186fd900205488d80323708c863bb03', 1, 0, N'San-Marino')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (158, N'Sao Tome & Principe', N'ST', N'239', N'644c21dbf5524917b6073f9c4e560b8c', 1, 0, N'Sao-Tome-Principe')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (159, N'Saudi Arabia', N'SA', N'966', N'bdf39425152a4ec9aa98350d1a92db3f', 1, 0, N'Saudi-Arabia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (160, N'Senegal', N'SN', N'221', N'36e0659ba38c4121813781937cb59081', 1, 0, N'Senegal')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (161, N'Serbia', N'CS', N'381', N'4e740e08ddc64fd2829818fe547ee21d', 1, 0, N'Serbia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (162, N'Seychelles', N'SC', N'248', N'74ec91014c8c4163bdca3614be77e0b7', 1, 0, N'Seychelles')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (163, N'Sierra Leone', N'SL', N'232', N'acc8084fff5644fd8335a360d15fedcf', 1, 0, N'Sierra-Leone')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (164, N'Singapore', N'SG', N'65', N'5140ab9dc45a48e8bfbc76459b712c29', 1, 0, N'Singapore')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (165, N'Slovak Republic', N'SK', N'421', N'eea9ad0d196f4d3189847ba54a43558b', 1, 0, N'Slovak-Republic')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (166, N'Slovenia', N'SI', N'386', N'04a9cb72613d44a68b2f7de44c78abdc', 1, 0, N'Slovenia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (167, N'Solomon Islands', N'SB', N'677', N'7796a0ed31c341e8b888faf4d7e2a590', 1, 0, N'Solomon-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (168, N'Somalia', N'SO', N'252', N'ace8c7c77c0a479dbc5621b11e29606f', 1, 0, N'Somalia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (169, N'South Africa', N'ZA', N'27', N'b6909c641df64ba3908eeabcaa9428a5', 1, 0, N'South-Africa')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (170, N'Spain', N'ES', N'34', N'7c57f3d0d5d84880afd7e4e87f09768f', 1, 0, N'Spain')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (171, N'Sri Lanka', N'LK', N'94', N'ae32750c277841eb854dcf6cbb92a005', 1, 0, N'Sri-Lanka')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (172, N'St. Helena', N'SH', N'290', N'c70888852ec34924a36c2c8598a4663a', 1, 0, N'St-Helena')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (173, N'St. Kitts', N'KN', N'1869', N'230249dcc8a84bf3afd148e102a9e2b0', 1, 0, N'St-Kitts')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (174, N'St. Lucia', N'SC', N'1758', N'355ecd5418b54a3a871419773360566b', 1, 0, N'St-Lucia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (175, N'Sudan', N'SD', N'249', N'656314dcfbc54fd6b68fae70bcbc1d0a', 1, 0, N'Sudan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (176, N'Suriname', N'SR', N'597', N'3e5d769c2f4c40809670eb6b5c320544', 1, 0, N'Suriname')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (177, N'Swaziland', N'SZ', N'268', N'4b384b6a5a72425683f61cc87a2d0629', 1, 0, N'Swaziland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (178, N'Sweden', N'SE', N'46', N'dee164e4c22949b9a98b7717a5f0bf62', 1, 0, N'Sweden')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (179, N'Switzerland', N'CH', N'41', N'2e518c9b6c5f46b48fd40aa9582c6fa3', 1, 0, N'Switzerland')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (180, N'Syria', N'SI', N'963', N'6e4b9720521f4706925781c5292f6a33', 1, 0, N'Syria')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (181, N'Taiwan', N'TW', N'886', N'6d94c95502034a72b05fa9b9eedcb6be', 1, 0, N'Taiwan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (182, N'Tajikstan', N'TJ', N'7', N'28b4a63c42e043008a3a946f31596317', 1, 0, N'Tajikstan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (183, N'Thailand', N'TH', N'66', N'f554d9d507e3453e94937e7df8036966', 1, 0, N'Thailand')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (184, N'Togo', N'TG', N'228', N'138e929e25f74c1f8103f303aab8cc1d', 1, 0, N'Togo')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (185, N'Tonga', N'TO', N'676', N'be87973e64fa444fab9fc1ad01470db0', 1, 0, N'Tonga')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (186, N'Trinidad & Tobago', N'TT', N'1868', N'b2072bc6897e4046867560404dd665e8', 1, 0, N'Trinidad-Tobago')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (187, N'Tunisia', N'TN', N'216', N'77ede04b540a4497b73497b180698d19', 1, 0, N'Tunisia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (188, N'Turkey', N'TR', N'90', N'2ddad76a18dd487283991fc212ad7816', 1, 0, N'Turkey')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (189, N'Turkmenistan', N'TM', N'7', N'2dd47a34e69942c2ab884af201375d7c', 1, 0, N'Turkmenistan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (190, N'Turkmenistan', N'TM', N'993', N'a08776734bf54b63964e94b92f3ea0e6', 1, 0, N'Turkmenistan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (191, N'Turks & Caicos Islands', N'TC', N'1649', N'58929d14b30748cbaa9f2f9d79cbfd7d', 1, 0, N'Turks-Caicos-Islands')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (192, N'Tuvalu', N'TV', N'688', N'2f6921c61436472c9b1e8b1c8d9bbbbb', 1, 0, N'Tuvalu')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (193, N'Uganda', N'UG', N'256', N'0925f98ad3314beead32373b3ab2c7bf', 1, 0, N'Uganda')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (194, N'UK', N'GB', N'44', N'666fe16c0f004afc9002a371f4c8360e', 1, 0, N'UK')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (195, N'Ukraine', N'UA', N'380', N'dfcd870aa7bd4bcc9ff3fe4bb40d6d3a', 1, 0, N'Ukraine')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (196, N'United Arab Emirates', N'AE', N'971', N'fd30a357fc054266834fc0ef28be99d0', 1, 0, N'United-Arab-Emirates')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (197, N'Uruguay', N'UY', N'598', N'a41ac94f3279498788aac794e21e144b', 1, 0, N'Uruguay')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (198, N'USA', N'US', N'1', N'9dfa5c687379459187aec4337bd42da6', 1, 0, N'USA')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (199, N'Uzbekistan', N'UZ', N'7', N'62bd4e5582694a2a8fad003604272d46', 1, 0, N'Uzbekistan')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (200, N'Vanuatu', N'VU', N'678', N'0b0b4af79ce844fb88556bfd45299905', 1, 0, N'Vanuatu')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (201, N'Vatican City', N'VA', N'379', N'd4c6628303d44443a9535f6822237dba', 1, 0, N'Vatican-City')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (202, N'Venezuela', N'VE', N'58', N'54cc0279fda749a69dd76f1ab619f887', 1, 0, N'Venezuela')
GO
print 'Processed 200 total records'
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (203, N'Vietnam', N'VN', N'84', N'fae60939306e4b348fbd0565f3b8460f', 1, 0, N'Vietnam')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (204, N'Virgin Islands - British', N'VG', N'84', N'14acae62c6df4ecaba83aa819cdee3af', 1, 0, N'Virgin-Islands-British')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (205, N'Virgin Islands - US', N'VI', N'84', N'0c5d4ccac02b4853b33139d09db744bf', 1, 0, N'Virgin-Islands-US')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (206, N'Wallis & Futuna', N'WF', N'681', N'fb75eaf23d6a424a846678cce81b711b', 1, 0, N'Wallis-Futuna')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (207, N'Yemen', N'YE', N'969', N'0bf6fd6bca294d8c8ecd5eca6429bee2', 1, 0, N'Yemen')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (208, N'Yemen', N'YE', N'967', N'73c95ac6076043f79f1144404a46e4f1', 1, 0, N'Yemen')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (209, N'Zambia', N'ZM', N'260', N'54265d20fbe542ac96e973c7f08a97f3', 1, 0, N'Zambia')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (210, N'Zimbabwe', N'ZW', N'263', N'80662284b6494221b115985a0e2ad4d0', 1, 0, N'Zimbabwe')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (211, N'Niger', N'NE', N'227', N'ec3f86097d2e4c51a5d875de2c9ed415', 1, 0, N'Niger')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (212, N'Bahrain', N'BH', N'973', N'4aaa0364723841468c86a43679dedce5', 1, 0, N'Bahrain')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (213, N'Antigua & Barbuda', N'AG', N'1268', N'f206dbea068841db81536d5c07b1b985', 1, 0, N'Antigua-Barbuda')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (214, N'Anguilla', N'AI', N'1264', N'67b44390f0ef48a199435380aa268d26', 1, 0, N'Anguilla')
INSERT [dbo].[GCountries] ([ID], [CountryName], [ShortCode], [PhoneCode], [Guid], [Active], [Archive], [Url]) VALUES (215, N'Angola', N'AO', N'244', N'fd1400fa612743c0a113f4c0acf47951', 1, 0, N'Angola')
SET IDENTITY_INSERT [dbo].[GCountries] OFF
/****** Object:  Table [dbo].[GContents]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GContents](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ContentName] [nvarchar](100) NULL,
	[CategoryID] [int] NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GCompanies]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GCompanies](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](100) NOT NULL,
	[Username] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GCities]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GCities](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CityName] [nvarchar](max) NULL,
	[TrafficCode] [int] NULL,
	[CountryID] [int] NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GCategories]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GCategories](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GAds]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GAds](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Header] [nvarchar](100) NULL,
	[CompanyName] [nvarchar](150) NULL,
	[Descript] [nvarchar](100) NULL,
	[Link] [nvarchar](max) NULL,
	[AdImage] [nvarchar](max) NULL,
	[Display] [bit] NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CUserInvitations]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CUserInvitations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[IsAccepted] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CMessages]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CMessages](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NULL,
	[Subject] [nvarchar](max) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CJobs]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CJobs](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[ShortDesc] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Section] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[PersonCount] [int] NULL,
	[CompanyID] [int] NOT NULL,
	[Urgent] [bit] NOT NULL,
	[Showcase] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Archive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CJobCities]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CJobCities](
	[ID] [int] IDENTITY(1,436) NOT NULL,
	[JobID] [int] NOT NULL,
	[CityID] [int] NOT NULL,
 CONSTRAINT [PK_JobCities] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CInvitations]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CInvitations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[InvitationName] [nvarchar](255) NULL,
	[Header] [nvarchar](255) NULL,
	[Message] [nvarchar](max) NULL,
	[Date] [datetime] NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GUsers]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GUsers](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](255) NOT NULL,
	[Mail] [nvarchar](255) NOT NULL,
	[ForgetQuestion] [nvarchar](255) NULL,
	[ForgetAnswer] [nvarchar](255) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK__gUsers__3214EC27787EE5A0] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GUniversities]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GUniversities](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UniversityName] [nvarchar](max) NOT NULL,
	[CountryName] [nvarchar](255) NULL,
	[CityName] [nvarchar](255) NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GTowns]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GTowns](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TownName] [nvarchar](max) NULL,
	[TownCode] [nvarchar](50) NULL,
	[CityID] [int] NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GSector]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GSector](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SectorName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[GSector] ON
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (79, N'Bakım/Onarım', N'691d1f50b7eb45c2ada8f00249b915f6', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (80, N'Eğlence Kültür Sanat', N'c2dc085f3604476380aa46a428e5723c', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (81, N'Elektrik', N'a30902b23bcb40a8b09dc412261626dc', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (82, N'Elektronik', N'f09001bb2988463fa122eb4604dd06cb', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (83, N'Emlak/Gayrimenkul', N'c5b1ff4756814f91a4028a4d37353d3d', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (84, N'Enerji', N'0e566b68a39f4bfb9c3f25a441dc0a0d', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (85, N'Gıda', N'f8870bcc7e734e51a1074c2c7fbdc7e3', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (86, N'Gümrük', N'8a2bb226766a4cccbde5e045d35824c3', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (87, N'Savunma/Güvenlik', N'28a466eaec064f2b9b7f866b5bb90070', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (88, N'Halkla İlişkiler', N'9e12be8467744031a972cee13fd242c3', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (89, N'İnsaat', N'fd9fdf1361694c92a822772761b162df', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (90, N'Matbaacılık/Baskı', N'af501f8038f04f84b7620faee28c5f1c', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (91, N'Mimarlık / Mühendislik', N'418db1a13f5845cfa17ddae2d9353e39', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (92, N'Muhasebe/Finans', N'2671bfd47b0f4e41a5f1ed60d6ca6d0b', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (93, N'Eğitim', N'bdf209684b304a089168d0b17fde4a73', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (94, N'Pazarlama/Satış', N'87e7f363b0ca4043880d38c58b830c62', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (95, N'Mağazacılık / Perakendecilik', N'03812e8c01934919b948f8d19677994d', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (96, N'Reklamcılık / Tanıtım', N'a6d2b0eb96b74cb5b90624a63aa57a5a', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (97, N'Restorantcılık', N'38c0ca1d4801483c8e78d5f93a262be5', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (98, N'Sağlık/Hastane', N'510e313009a7400b97d2c5bd8c1fce4c', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (99, N'Sigortacılık', N'feb726049641453f99bb5cb6397893ef', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (100, N'Tekstil', N'da409398a8f74b439f49aa029b238aef', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (101, N'Turizm', N'dd4413648db54f19b9964a98cff079a3', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (102, N'Sanayii', N'b012170104a54c518d7ab6e4d239be3c', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (103, N'Lojistik', N'65f572f61bd144e6884a44fdc75d5ceb', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (104, N'İmaalat', N'363f61e3cc9440caa44e3f65d96ded1f', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (105, N'Hizmet / İşletme Servisi', N'629e08644edb420f9db04ba05436d7af', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (106, N'Telekomünikasyon ve Network', N'06783cd5085846e092e957d65979b716', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (107, N'Nakliyat/Taşımacılık', N'f7d823f6bb424da885b1e56a14f93204', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (108, N'Medya', N'f4df1434f83d4bddb828eb2c3405a744', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (109, N'Ambalaj ve Kağıt', N'744ef63defcd43acaf7e096352158e64', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (110, N'Demir-Çelik', N'45f4d82635c2482791d5b9edca2b2ed4', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (111, N'Ulaşım', N'39d34199f56546539ed1a26367457f64', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (112, N'Kimya', N'20d58bc0244a483dbf2c5105c26b9c80', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (113, N'İlaç', N'a0cb94bc0e6741ffa9baa76dba030333', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (114, N'Yapı Malzemeleri', N'5353f734e5994636a974cb3dd637905d', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (115, N'Kozmetik', N'e4005073ba7743c590f4a6e1170a6b93', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (116, N'Petrol ve Petrol ürünleri', N'3a67d65e39b34376b1f0fe49eb021a25', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (117, N'Dayanıklı Tüketim Malları', N'c73c5885bbb24bd3b9dc416277ddf3ca', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (118, N'Dağıtım', N'9f5f17001e6f4569b24552694c84b663', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (119, N'Beyaz Eşya', N'5b3fa98625ab4372aeca56127afc34fd', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (120, N'Dış Ticaret', N'2b043e2afa6d499d928ddb95efbce98e', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (121, N'Tarım ve Orman Ürünleri', N'e42e3b08b4cd4d48ba64434e6b8fceb8', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (122, N'Madencilik', N'ac4c067c5d834fafbf4699cee177d3ba', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (123, N'Holding', N'9769ad54265a4f2d8fd9c599c023c8ed', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (124, N'Toptancılık', N'c9017abab8844e9680e50b72f6c68c9a', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (125, N'Hızlı Tüketim Malları', N'3a8844a5c9e44be784677d5a8b35f6cf', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (126, N'Cam ve Seramik', N'1bc175cbe9634ad88fd772b6499e0d82', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (127, N'Havacılık', N'0a4dfb4126e54eecae9986ca2101002f', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (128, N'Tıbbi Malzeme', N'46bded1e18ab4952baf5e5351e49790f', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (129, N'Sanat', N'86d76406bb4a4f529acb5bc9c4bb4878', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (130, N'Deri', N'008ff4cf64d54a779347c00a4b02bb35', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (131, N'Hayvancılık', N'a1612bd213f44702bf81bdc289fb8463', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (132, N'Dernek ve Vakıf', N'959e7f67305049089cb23775d2013e53', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (133, N'Sosyal Servisler', N'1e107b5b43474f7c96349bc1c3d53c9d', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (134, N'Mali Denetim-Vergi', N'5621b99dc8054eccbe9bb1e0128c5b3a', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (135, N'Faktoring', N'2b07cfb2fcda41259776d9d17720b256', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (136, N'Yatırım /Menkul D. /Borsacılık', N'd452d5572336434c9ce5f2932b655258', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (137, N'Leasing', N'7b0d4c9cc93e40df95f81a9847af89b5', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (138, N'Danışmanlık', N'59e6689936ed47a0a97d3fd34621e576', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (139, N'Otomotiv', N'4b54441b0b8649269548f45be2df0f10', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (140, N'Temizlik ve Temizlik Ürünleri', N'98e22036d27e4fcfbdf2669b428d3137', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (141, N'Diğer', N'3ef03f650a6a4698a77008356cbff7a8', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (142, N'Bankacılık / Finans', N'd27c4018d0ba4e81a2af2816904b9a33', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (143, N'Endüstri', N'4690efd8ce414699a9fbddd5c3f0ce21', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (144, N'Hukuk', N'70d9d1f9120a4256b005009315c0701f', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (145, N'İthalat/İhracat', N'd17f76e2e9d24fdcb771ced90f21db98', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (146, N'Kamu', N'b83136168dc648c18a17d8eaa7693b5f', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (147, N'Mali Müşavirlik', N'f9d666b833d546f1a16430f4c69a3340', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (148, N'Otelcilik', N'263da86d229648cc94c4b93208e76959', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (149, N'Otomotiv', N'8ed2443d78e448c6baad5743f739d419', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (150, N'Yayıncılık', N'27917273b719413cb515259fb55ea2ca', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (151, N'Mobilyacılık', N'80fafdd4fa0b495e82481c901720f9bf', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (152, N'Demir Çelik', N'bb7ce00c1dfe4dad9dc4e48f5289d655', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (153, N'Denizcilik', N'a2c277b7afa0490aaed17af18df17ad9', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (154, N'E-Ticaret', N'a188d3631ace4f50b999226b37194040', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (155, N'Bilgisayar / BT /İnternet', N'd5b4145285904713aba4e709781beb27', 1, 0, NULL)
INSERT [dbo].[GSector] ([ID], [SectorName], [Guid], [Active], [Archive], [Url]) VALUES (156, N'Atık-Geri Dönüşüm', N'15ebc2f624ef4e3280dec07c3e9542f1', 1, 0, NULL)
SET IDENTITY_INSERT [dbo].[GSector] OFF
/****** Object:  Table [dbo].[GSection]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GSection](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SectionName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[GSection] ON
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (611, N'Saha', N'8366b0605097433a82de60b8afbdbebb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (612, N'İnsan kaynakları', N'507e47e159dd4e10a5e1f76f6062effb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (613, N'Muhasebe-Finans', N'1cb84c5433144af48203d95de1a7853e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (614, N'Depo', N'081ed6a0c2cc4b7da81f22b1045d1cb3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (615, N'BT İnternet', N'590978e25c474c81b73980c983d7aa82', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (616, N'Çağrı Merkezi', N'879a18783c5a4409a61ba4336ebd5b73', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (617, N'Satış', N'56f88dd938594765994d2aceecbf5874', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (618, N'Stand', N'e8c73dc101ed4255a6dcee3ec42d94d0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (619, N'Pazarlama', N'7bc48c0b873c439a8dff4358abf850b5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (620, N'Telesatış', N'96f77315a7314e3799e438268e2e6734', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (621, N'Turizm', N'7c853a7256b04749bed9061f07bd9d82', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (622, N'Sağlık', N'11ffe91c7d924becab58dc4cef5fc2bb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (623, N'Otelcilik', N'6a23048102d147669f44c1715ef7b835', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (624, N'Restorancılık', N'ff35ba4e5d2a4062858eb534f7eb5c04', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (625, N'Güvenlik', N'9f101ecd010d42b08375f6e86d8b5040', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (626, N'Sigorta / Emeklilik', N'9cf6b62d82214969ac4523f54fcdded5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (627, N'Matbaa-baskı', N'd6c8f76ed78d471c910ce84522e0a17f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (628, N'Danışmanlık', N'a7fa605bbf5846fc904159513fbd6769', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (629, N'Forklift', N'f5bf8e2a20af4c25bb94aaf02006f5fb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (630, N'Elektrik', N'53f5333850eb49ee8f9245a1a73cf5c0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (631, N'Eğitim', N'56bc3788394847878b2a90a5e24e7042', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (632, N'Bilişim-Bilgisayar', N'6c1b2874b549446da02d1099aaba1a2c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (633, N'Emlak', N'307da4a056704a51ac3a4fa8920766ad', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (634, N'İnşaat', N'805d28b25ecf4a89a10596a428bc8383', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (635, N'Mimar-Mühendis', N'7f2aa64714844dfdb14b5bd0951f503b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (636, N'Temizlik', N'5d516bc787cd4ad88c1f87bd0a47d379', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (637, N'Üretim', N'29655a5ad3f540878ad317e7bbe29aa4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (638, N'İthalat İhraacat', N'c57b56dbb021443ab8c3776a7f1abdfa', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (639, N'Kurumsal Satış', N'56bb6521d6dd443caac08cc28a09b46d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (640, N'Santral', N'f0bd3eb1ca5b469cad675ffa4c650185', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (641, N'Endüstri', N'998df17e65444561948df4c1e2c745bd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (642, N'Arge', N'c7de6722a4554cdb8fc642d215ad79e7', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (643, N'Laboratuar', N'5c940f1f97be4805a25554942119a7eb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (644, N'Ofis Yönetimi', N'9338d7f6b50f49a88050fb71f34091ab', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (645, N'Makina', N'32c6ee5499e54391b76686021c30e852', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (646, N'Teknik', N'fe91250e2cd14dc9a57d85c36b69d562', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (647, N'Anestezi', N'd269ea33ac164c1092b62d67f0e2879a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (648, N'Dış ticaret', N'c28be79dd0b049179822ed46be90c8da', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (649, N'Dijital-baskı', N'36ac07efdea94a6f817778ceae2fb9eb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (650, N'Veri Giriş', N'b20b4c8bb99c4d169d9e135497ab379e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (651, N'İnsan Kaynakları', N'42805c0b406b4b9c93a6410b46fbc716', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (652, N'Acente', N'1df309933a674c82b8d5d49d79ea84cb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (653, N'Acil Tıp', N'e49ecf01c413461085bf2a6a60df49ee', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (654, N'Ağız ve Diş Sağlığı', N'376e9df62ea149de9c419c2eafc6aba3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (655, N'Aktif Pazarlama', N'08cf5434dbfa44089df5919f4d759d30', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (656, N'Aktif Satış', N'2a51175cc13f4808a27d120881ac3a21', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (657, N'Aktivasyon', N'609f51d9927c4286ad84fb280fdf8ca2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (658, N'Ambar', N'0c108f84d89b4fe4ac88d2937c304c33', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (659, N'Ambulans ve Acil Bakım', N'149c5e2244104c53a5f124586c01345c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (660, N'Ameliyathane', N'814b2afa7bf84ed8928bdf93d336242d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (661, N'Analiz', N'd9bb257096f246a48903252e1b1337fd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (662, N'Animasyon', N'ed14819225e7481ea67048bcba9e91d3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (663, N'Antrepo', N'cfda3a2bfaee4656acbe30665b2a3a53', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (664, N'Araştırma', N'9681657d3f284f24b461f7a546d540e1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (665, N'Arşiv / Kütüphane', N'd64cc01d7e8948409f35ce4b643710c0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (666, N'Bakım Onarım', N'79a6e0537adc4d79b6b7c3ee94051f4c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (667, N'Bakteriyoloji', N'ba2e857c63244c10a6771c3e27981002', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (668, N'Banka', N'87c0b5d142104941a5b1c052d6af9cd9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (669, N'Bar', N'1913c91b516f452db4129725f6eb8e2f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (670, N'Basın Yayın', N'cca663f2e925402ca497a97ab5fb7389', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (671, N'Baskı', N'993b7214554a4b349b45bbadc240f2fb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (672, N'Bayi Kanalı', N'a25d3ab19b144b5e83b47f4907fad741', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (673, N'Bilgi İşlem', N'63eb23617dc04fc5a20851ac1e8e2208', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (674, N'Bilgi Sistemleri', N'fbc03a0d8ec9495a8f0d27c9c8c490f4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (675, N'Bilgi Teknolojileri', N'8ad32a32581d4dd696be3be76fef8687', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (676, N'Bilgisayar', N'5f01cd4b2ece40dba077ae5eedaee075', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (677, N'Bilgisayar Donanım', N'847d9034f1c745528aa9b774bc970cbe', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (678, N'Bilgisayar Yazılım', N'65dbd3277cdc495eb617dfb35aa2bca6', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (679, N'Bireysel Pazarlama', N'56fd71cfeff1465cba27633a9af55da3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (680, N'Birim', N'a411902dff1840c6ba0386483c472358', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (681, N'Biyokimya', N'b56a4595addc4a1f99cd8924abf59d4e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (682, N'Biyoloji', N'0afbe4bf80bd4bdbbd0ce6b4b2179b6b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (683, N'Biyomedikal', N'782f0b43e3e84af5bd8aedccb77a3742', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (684, N'Bölge', N'190eccf9b1764d5d9b531327440e36e3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (685, N'Bölüm/Departman', N'c703c8f0dbb54c469769fb187d888aa3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (686, N'Bordro', N'0fd84a7b47c840078d0d02963d900b39', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (687, N'Borsa', N'261dfccbc8c64c0eaa9e37192c648d59', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (688, N'Bütçe Planlama', N'74d23f1b40814b4a89b5c7bb91aee4a7', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (689, N'Büyük Müşteriler', N'5fb1ed16ed2f47d59cbdb096b0200741', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (690, N'Cad/Cam', N'e2ceaf7cfcb74dac9fae419b5f5c32e0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (691, N'Çamaşırhane', N'3e91bec21a12480ebd3d0ea119198d3f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (692, N'Cerrahi', N'6fd807c80f454c869e19da7e19c25619', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (693, N'Çevre', N'1484e765bad84349ad66244d4d445add', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (694, N'Çevre Sağlığı', N'0197ab6bd1eb4b308fd7c7f9424c4d5c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (695, N'Çocuk Gelişimi', N'fa68003467224be4b8fffbe9b29cf054', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (696, N'Dağıtım', N'ef2328d450f94f70815914bf0d37824b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (697, N'Denetim/Audit', N'240d070cd0444685aaa84efe7d90ced0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (698, N'Deniz Bilimleri', N'2a99a965dfc748e6add617620bf033f3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (699, N'Denizyolu', N'8a16de9265894b2f9b7727d86bf24df6', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (700, N'Destek Hizmetleri', N'cf7316a4b8a84262b83e91bde6fddfff', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (701, N'Dış İlişkiler', N'b5dd95d70b9c4235ac4d2ea4473a30ed', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (702, N'Diş protezi', N'f6bccc929d0c41d48c2b327f6609c4e7', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (703, N'Dış Ticaret/Gümrük', N'1ed19650d2f244149e8d75e62f4bdd60', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (704, N'Dış Ticaret/İhracat', N'e9b51e968f074ee4bf8c59f134ca1135', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (705, N'Dış Ticaret/İthalat', N'0ef57c6a0ccd4777bec39a8f3b40dfbd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (706, N'Diyaliz', N'7baca8e508f74d3a86c216fb35c992ba', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (707, N'Dokuma Teknik', N'00ef2bcf27b24eb58051dc3ff3b40eb1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (708, N'Dokümantasyon', N'af9797f26bc84d76a1505b2e3a90ffa9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (709, N'EEG/Elektro-Ensefalografi', N'be0716fa8ee24d8ebd7f997d4110a4a0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (710, N'Elektrik/Elektronik', N'a9ddeb5111c64c89b1a70742a4388b96', 1, 0, NULL)
GO
print 'Processed 100 total records'
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (711, N'Elektronik', N'604ebd62bab74be0bf098cfac825eb43', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (712, N'Elektronik Ticaret', N'2e090663bf624f8a9d3bf9c4fd869649', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (713, N'Elektronörofizyoloji', N'4a9140d42c2e42d0838a897516ba5b6e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (714, N'Endüstriyel İlişkiler', N'a38a17bd84da4ce4a87cfc135e46e339', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (715, N'Enerji', N'c78a505ac0fd4f50af27a7365ceeeaf8', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (716, N'Etkinlik', N'86b9269eecd84d098841fd52676b3a3d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (717, N'Evde Hasta Bakım', N'fc4ac16bb0a24e938ab82e01d1a0fbe8', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (718, N'Fabrika', N'f409a1cf2291472591f784d3c13aa7f1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (719, N'Fason', N'e06a4d57363340f2864b629b1a705d58', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (720, N'Finans', N'8749bcca77c54d95a9bcf03d496fe9c2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (721, N'Çay servis', N'4413347cc2dc445086c8564091b72215', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (722, N'Fizik Tedavi ve Rehabilitasyon', N'470d6a6727af4afd9bc58e4c353ca093', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (723, N'Fon Yönetimi', N'56e596afc8a64f038e7f42734e5ef48f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (724, N'Gemi', N'a14f8ac1454c4d9884570574a4431936', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (725, N'Gemi Makineleri', N'9b1ba8199d564d67adc204d07f61a4fc', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (726, N'Gezi', N'ebb7804aa9ad4825a1120644915ae993', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (727, N'Gişe', N'236fc3a57bfa4696a6dcde92a2ec8b9b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (728, N'Görsel Düzenleme', N'13b6ce0f9da04aa1bcd794c6fea2c8e5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (729, N'Grafik', N'21ab6b92a5654b9ca6c0a9094f9e40ad', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (730, N'Grup', N'6bdd4796cb084e4e962be24678c6d563', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (731, N'Güverte', N'48037420632f474eb9fa40632f62bf8b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (732, N'Haber', N'a669ec37837d46abb809ebde4c2fec9d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (733, N'Harita', N'40d563b1cf134d7bbbea8e4d3a391655', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (734, N'Hasar', N'6a1f01ecb21943cb8d28f9a16cb1957a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (735, N'Hastane', N'27f0432612bb4d12878c0d939f9b551b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (736, N'Hastane Otomasyonu', N'faaf7fc0527d4c4d960fc8aa602449d6', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (737, N'Havayolu', N'31f4d8d8c751445aa1d05fcc1e17e0f9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (738, N'Hazine', N'2f47e23f0380444089d3771e845ffda8', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (739, N'Hazır Giyim', N'638ca000dbbb483791dda83287d26de3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (740, N'Hesap Araştırmaları', N'8f3cda0683bb478a868d44a21eae258d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (741, N'Hidroterapi', N'd59f89d247af479586a2a94470fdc9fd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (742, N'Horeka', N'84aa7f22fb194e3b897e6b857d5280ac', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (743, N'İç Denetim', N'd4420575f2064339b6e38595786b809f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (744, N'İç Hizmetler', N'8181ed151d964dabbe96d0603ff1a274', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (745, N'İçerik', N'c0b99b2aba284e86837b88ec73f3af26', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (746, N'İcra', N'65fe6be0baca43bb8575ee1434909464', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (747, N'İdari İşler', N'fde7cb3f29b54403939fe5cf1780ae2a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (748, N'İhale', N'4eb2e264e3754573a5a0a93c8ebdcbeb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (749, N'İklimlendirme', N'59691216c9954b5b9054618947e9e34d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (750, N'İkmal', N'a350e14e477f4b758e0f9e46727f8e14', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (751, N'İletişim/Haberleşme', N'75aae1dd2eb34660939aa55fa4a9d3e9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (752, N'İmalat', N'dff1224e613b4fbf806b46ddd17340b3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (753, N'İnternet', N'3cf94402a4d14c429ccb8e58b50990c1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (754, N'İş Geliştirme', N'9c9f8001be4041ed8081fd7c449e4410', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (755, N'İş Sağlığı ve Güvenliği', N'91d7ff1b20a0447c8b66a8b56d2a31c9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (756, N'Isıtma', N'b7f27c28e10a44d0a3e89f034ce2ed5d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (757, N'İşletme', N'bb71fe1954a54bf6ba657a030512c614', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (758, N'İstasyon', N'a51403360a2f4116b4bc4096b1481df8', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (759, N'İstatistik', N'ccf7d171f78c4b2fa7e33640da3a0feb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (760, N'Jeoloji', N'd7f2bbc994b44692b2b18ce15476a0d4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (761, N'Kabin', N'48358859972f4f34900aaa8d5ef696d3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (762, N'Kalibrasyon', N'27ce3ed12a5a48b198028971646799d4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (763, N'Kalıp Tasarım', N'7d8225283ecf429994f5762dfc0678a4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (764, N'Kalıphane', N'84c386f2f2824ccfb6fa04b97a715e46', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (765, N'Kalite Kont/Güvence', N'eb0a8396a85149879f5e3e85e50e157c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (766, N'Kambiyo', N'16e82a9280d2465ebb206f896c89bf48', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (767, N'Kanal', N'7adc871dd9744d789aab1b22104b3798', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (768, N'Kanal Geliştirme', N'f6312feef07144c88138fd1f8dea9274', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (769, N'Karayolu', N'5ce092b847644cbbbe0d7a5fdbee5108', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (770, N'Kardiyoloji', N'55bbd779d60d44b181f45c1d1dbab8df', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (771, N'Fizik', N'e9d5f068ce214d67b158b3286159b7e9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (772, N'Kart Satış Pazarlama', N'd2d2f3ff542b4ebd9e6eb779702a905e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (773, N'Kasa', N'71326548990345d098881d396d7380d2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (774, N'Kat hizmetleri', N'0cc026a01b7d47b39180f73a679e3c47', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (775, N'Kategori', N'ee5180c1127e47789b5047d80e6a29b1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (776, N'Kaynak', N'd972ece8499745f8b7c09e1facdc75f1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (777, N'Kesim', N'f71669f07ad24485a026bd59318e3789', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (778, N'Kimya', N'530a063f4d014fa4b0bd37e9f2018dbb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (779, N'Klinik Araştırma', N'd4c8310912c84a9eab8b5f54e17a4e3e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (780, N'Koleksiyon', N'd050a4e6ffc647129c76b6e07f8d5afd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (781, N'Kontrol', N'ae32b53a674049828d8c073c173c3c6d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (782, N'Kredi Pazarlama', N'a9d0805fd8b84506848eb16bf4136703', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (783, N'Kredi Risk', N'c36fb093738f4c9c8f28cd9fc263b0e5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (784, N'Kredi Tahsis', N'f7ca2ffdd43f46dd8657987dbd27d1cf', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (785, N'Kumaş', N'72c627a02b6b4f1da109cca8d207d58d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (786, N'Kurs', N'c8f26ca293d54a0585fa88764bc13c06', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (787, N'Kurumsal İletişim', N'd069f38de346417b8c15240f4e634b6c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (788, N'Kurumsal Müşteriler', N'515d4f274a984f4ca386a80ff92b0aaa', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (789, N'Kurumsal Pazarlama', N'ffcd8cb0e568475ea54f11098330e0ee', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (790, N'Laboratuvar', N'022080e2d91a48858a92d0faad5f881b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (791, N'Lojistik', N'f2113b6b8f5044e59e01e7ec6bdd1fc2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (792, N'Maden', N'0e5edd4a5ea14e969c24b1ebc98c7fb8', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (793, N'Mağaza', N'72c6e3affcea478b8f31da07b683250b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (794, N'Mağaza Satış', N'e2ae9dc41a6745f69690bc290249f732', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (795, N'Mali Analiz', N'183e78bef65941dea5b3514816f9dc42', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (796, N'Mali İşler', N'beee7ce0937f4a139490944240167619', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (797, N'Maliyet Kontrol', N'c697e332f67c4cfdb25259b444c207d3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (798, N'Malzeme', N'b087a5799dc945dea8557967cba27d6f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (799, N'Malzeme Planlama', N'8f48ab7d36b54edea8d689090d6e9744', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (800, N'Marka', N'0e5c101b127e4b3c8c379b64efff949b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (801, N'Marka İletişim', N'473b9436c0144706b4601d85f19d1aff', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (802, N'Marka Ürün Yön', N'af5d17b2f4e74b3085364d8276ad1779', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (803, N'Market', N'a6d17c2599174b20b24397942ccb0c2a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (804, N'Matematik', N'677aaf3c96ac455b99ad6c1f43402b4a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (805, N'Medya Planlama', N'f3169198eabb43a6b417528907c51fb4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (806, N'Kargo', N'b3195ba5a201451fa170871fc42b6947', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (807, N'Metalurji', N'fb009a6dd6bf409db79706fa15eb0ef3', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (808, N'Meteoroloji', N'0d3e661b2f404580b473c4e08ee47e63', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (809, N'Metod Org', N'a35dd75c1ad047d4ad893df017f362e9', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (810, N'Mevzuat ve Uyum', N'ec48aa0a935048d2933bec2d7935d280', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (811, N'Mezoterapi', N'5ab688bdeefe49269388266dd99f46f1', 1, 0, NULL)
GO
print 'Processed 200 total records'
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (812, N'Misafir ilişkileri', N'be153922adee42de8fd9dffd5d756251', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (813, N'Modelhane', N'84821c343d744149b6f609bf851abf47', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (814, N'Montaj', N'c6b18edb81d2475580ade2c14e9c5071', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (815, N'Muhaberat', N'f8a93d777c514d6ebcb9bc0a4794f5e4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (816, N'Muhasebe', N'65f6e177c6b749e9b6ed3a48241fbbf5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (817, N'Müşteri', N'fe59330e89a645b8839b5219f6d2998b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (818, N'Müşteri Hiz', N'e242c999cd41403fb59361f7f220fd1a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (819, N'Mutfak', N'b0fe280fb5bb4a709e72b5d01c10f028', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (820, N'Nakliyat', N'd3242dbd0eea47109fee066865e56631', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (821, N'Network', N'3932fcfc805a4f6eb9aa94a681cc4b8d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (822, N'Nükleer Fizik', N'46d1ad88427b4860bc4888e9ed6c0f6b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (823, N'Numune', N'4e7574f6a6da46fe8dd27628f378b4b0', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (824, N'Odyometri', N'a2143f2bb36e4d8ca3182f08d91064a6', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (825, N'Ön Büro', N'410412335c214359b9b478eabfadf0ac', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (826, N'Ön Muhasebe', N'34ea6f4c82f0489391dabe6cb184146d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (827, N'Operasyon', N'10e11174566e40c084cd58a85d3f6991', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (828, N'Organizasyon', N'c4b225a324794402b4c79886d29613fb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (829, N'Ortopedi', N'2a8531a217cb4b83bc502f296eba6a22', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (830, N'Otel', N'bffcacc2d8444f47a30eec96c615835b', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (831, N'Paketleme', N'7e2d6d26210c4dfc9f5d57d7a058dd82', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (832, N'Patoloji', N'3a72000e717e45ea94ac1cc2ac296ccc', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (833, N'Pazar Araştırma', N'b431ed6f222f4523bd0164829c0397ff', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (834, N'Pazar Geliştirme', N'af4e159de9dc4bc7b1b487e488e2d26c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (835, N'Perakende', N'4b2b748a93b242e4bed4d04e5e33a713', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (836, N'Personel ve Özlük İşleri', N'e9203cf4f0a248769876620583852735', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (837, N'Peyzaj', N'a092718efe674032a4028a43c69bb10e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (838, N'Planlama', N'67d03383358b4bf794a0b5ae98f1245a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (839, N'Portföy', N'2dc600e3c1bc42c4b6465031a48cf6c5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (840, N'Proje Yönetimi', N'4dd6eee5df574b368ab41104f4443960', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (841, N'Proses', N'7b9c1453d99743a183426bf6e65d0b86', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (842, N'Protez Ortez', N'9aa091b2b5474a619a4ce4c8caae6fbe', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (843, N'Radyoloji', N'979ccdae1d994f94905540f322bd1104', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (844, N'Radyoterapi / Nükleer Tıp', N'fd37a2c2b6244c57a545712f4aae89cf', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (845, N'Raporlama', N'47b3b45043504d52a756fb63ed8e5caf', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (846, N'Reklam', N'd60350c6e5784e7ab71fdbbd89310198', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (847, N'Resepsiyon/Santral', N'2a1c9c5ada2b4cb3ab77e8d39808f15a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (848, N'Restoran', N'767b778bb1ef435b93e029e090e69a1f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (849, N'Reyon', N'ff17e03091ff430aadef5326deca727a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (850, N'Rezervasyon / Bilet Satış', N'515f9af4f93f457da93c22b4f1917fbf', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (851, N'Risk', N'1beadaf510b84be19c097f25b20d0869', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (852, N'Ruhsatlandırma', N'1fb5efdc5a1a4577abb2b2d9f5107396', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (853, N'Sağlık istatistiği', N'f369e563500c437c9dd17b1e0d8c04f6', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (854, N'Sağlık Kurumları', N'4071bd9f906041fdbcf716f13420ec99', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (855, N'Sağlık/Medikal', N'890d09583ee34c2ebbdf80beeda4679e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (856, N'Şantiye', N'7ea9ae8fd618409898e79dda31a13455', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (857, N'Mekanik', N'd733ff48e24448a6ab3b06c67d027201', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (858, N'Satın Alma', N'24f73f1bbe3a439480fb90d17dfad871', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (859, N'Satış Destek', N'6656175ea12149b8ab9e9da1fcb87051', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (860, N'Satış Sonrası Hizmetler', N'c2dedb926bd44f85bbac80d8998541fa', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (861, N'Sekreterlik', N'43e88a76660446a4bdeda398defcd9ba', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (862, N'Servis', N'8327b8342cf545e3a9bfb671ff671dcc', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (863, N'Sipariş', N'9c749ac1b4f94455ad4728e445cb9320', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (864, N'Sistem', N'846e24907771407a89a7f614b0e32fd8', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (865, N'Sistem Geliştirme', N'6b3ded1c314b4779bc95ab93fe531117', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (866, N'Soğutma', N'b5237cce0f21443ea454dbcab60b2d21', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (867, N'Sosyal Hizmetler', N'583180373a57482d97477019203e62a2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (868, N'Spor', N'9c4e76c59a614e6aa44479a4a75633c2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (869, N'Stok/Sevkiyat', N'8fff51cdd2d148ff8756d0eb8be78b3e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (870, N'Strateji', N'8a5b6ff60bda42b18ec66f7b2e03428a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (871, N'Stratejik Plan', N'019c9aec694d4cca97d643e4b8fd9fdc', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (872, N'Şube', N'e8498be3eadb44ad8eb863e7c8f4b030', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (873, N'Tanıtım/Promosyon', N'64039dd946744d6b962f2b64646430a5', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (874, N'Tasarım', N'a433f628a492490182c27a2b72048ea2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (875, N'Tedarik', N'3255dcf5c17640b7b97850c3a86f9146', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (876, N'Teftiş Kurulu', N'16bf54544bad4de3817350263480d3dd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (877, N'Teknik Destek', N'6f054fa44c6b427996a8c85d26fe9311', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (878, N'Teknik Servis', N'3667092f80f94da9b406410e130085a1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (879, N'Teknik ve Aktüerya', N'd533c5309f3e4e53a18c1e0005bdd735', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (880, N'Tekstil', N'82cc3030b8744a37a11b0c09135e4283', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (881, N'Tersane', N'3862a297dc2f4868a82c7b31699a5c63', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (882, N'Tıbbi Laboratuvar', N'282d753bbf3645f18e752c703e946ddd', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (883, N'Tıbbi Sekreterlik', N'836f9d26c5bb4cb8b166723f6b0762ac', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (884, N'Ticaret', N'65acf64f7ee44ab7a223427f8d9b9583', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (885, N'Tıp Elektroniği', N'a0226f0c58324dbdb01bc58d0b76f34e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (886, N'Toptan Satış', N'd5b1ff7d1646438db5a91ad6563aa71d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (887, N'Tur', N'884933a050ae4499a3622ab419a8adc1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (888, N'Uçak Bakım / Onarım', N'53ef098107c545e482395eadc5483716', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (889, N'Uluslarası taşımacılık', N'b8c18fcc21a24badaa6f3fe247db2f59', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (890, N'Üretim Kontrol', N'1541ef11f1b94e7594123f7bb205924f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (891, N'Üretim Planlama', N'4645e22f1b3c4ae79d455a45c9dd5422', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (892, N'Ürün Geliştirme', N'434347da0ba348a8b42c67af913a3383', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (893, N'Ürün Yönetimi', N'3ed795047df648d8b3db3d72bb287f08', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (894, N'Uzakyol', N'8dabdcdad17145c3a4e26fff7edf8d4f', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (895, N'Vardiya', N'1563680aeccf4bfea5804c019ef19916', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (896, N'Vergi', N'e6d31179c86e42eb92c34dd07f46ec42', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (897, N'Veritabanı', N'15cf51b5cd3e4f408212710b0f5fbd5a', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (898, N'Vezne', N'2e0d1fea03c7484db930409c537c90d2', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (899, N'Vitrin', N'afc75a33438c44889aef323334404a12', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (900, N'Vize', N'a5a6763288254241aa661cc38c523a3d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (901, N'Yaşlı Hizmetleri', N'4802dc57cc7f4264b14c9e3ec45c9fd4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (902, N'Yatırım', N'f658f24b0fc647748c0a559be3843c3d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (903, N'Yazı İşleri', N'7f53d3f7a78b49398cb52e2e5b339ded', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (904, N'SAP', N'aadae2105f59494db05c0416e8e557cb', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (905, N'Yiyecek/İçecek', N'0861ba13ce88448687afe7bf6c5f50b4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (906, N'Yoğun Bakım', N'df3e4e3d08b04bbe856cb63a6cf9f99e', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (907, N'Yönetim', N'67a55cbf936b43ee999f2e4c588985a1', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (908, N'Yönetim Kurulu', N'4ceda47f2264435c94b8d717a87eec22', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (909, N'Zincir Mağazalar', N'8d593342732b4368b146d63eade085aa', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (910, N'Ziraat', N'5f1b65ed5b9e42d1b9b6c3d8bcf6267c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (911, N'Yıkama Boyama', N'e19386d9a0e44b1097d4411537a24b3d', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (912, N'Hukuk', N'9a991f0928714d91b66c8a219504ef26', 1, 0, NULL)
GO
print 'Processed 300 total records'
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (913, N'Cnc', N'ff13b74ed688465aa73abd1c75df010c', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (914, N'Halkla ilişkiler', N'7d58a328b0ea4695b98a7d523271bbf4', 1, 0, NULL)
INSERT [dbo].[GSection] ([ID], [SectionName], [Guid], [Active], [Archive], [Url]) VALUES (915, N'Gıda', N'f1f16dd7fd344cf49a7da7fbec357600', 1, 0, NULL)
SET IDENTITY_INSERT [dbo].[GSection] OFF
/****** Object:  Table [dbo].[GPosition]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GPosition](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PositionName] [nvarchar](100) NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[GPosition] ON
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (1, N'Müdür Yrd', N'54e67d1e53524578b65a91f6999ef8c6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (2, N'Avukat', N'bc6e06b467be46d6a9371394975dc75b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (3, N'Eleman', N'dda13e8faba5484cbd39ffed42babc99', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (4, N'Müdür', N'783bc6ed51e54607b88b5eef65d91e48', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (5, N'Yönetici', N'278288de99b148289857c5e0c0a41aa5', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (6, N'Stajyer', N'cead678680bf4b2d9ae82cae05200ba6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (7, N'Hostes', N'67ae040dc5e0407ca407cdc36b81425b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (8, N'Hekim', N'a2819139656e42ebaaabbde8ef848105', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (9, N'Uzman', N'eddce3a4ecb14bfb970374fae9bd25fa', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (10, N'Operatör', N'4123ab45ac2447d7a7a893011e6c5319', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (11, N'Host', N'ab4d5bd4ecd045e6a28b4deefa0df00b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (12, N'Şoför', N'94ebec8d84784cbeaf2271039e54bdec', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (13, N'Temsilci', N'1f68cc1bb917449c80cff790d51e0497', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (14, N'Danışman', N'e981e4a06d2a4bb89420d3235ea7b1f1', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (15, N'Grafiker', N'd13a689db57644b2868eaf061c5e98a0', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (16, N'Yazılımcı', N'ccdd65c700364e39acbf85a66a7c8462', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (17, N'Web Master', N'1eb40ee871254dccadb6a8d13c965799', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (18, N'Bahçıvan', N'bf2a2217b9414bf28e5878abb7de70e2', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (19, N'Takım lideri', N'00a67a32dd50445a8fc303e18ac55e02', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (20, N'Tasarımcı', N'adb0a250e43c4af9aa84d99b2f6d21d8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (21, N'Öğretmen', N'6042d6cea14c4d01b5db1ce6ac5e2bee', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (22, N'Kasıyer', N'74674b78b52c4ac7a5cbf46422b02c97', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (23, N'Ahçı/Aşçı', N'e0ae9706eba9452b89a262217b664d9f', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (24, N'Manav', N'72ac616f680044cfb402310148516fd5', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (25, N'Görevli', N'a852c63d49684529851d5f763c9854b7', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (26, N'Yönetmen', N'b9c7e19925b6461f821963403caf3ece', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (27, N'Garson', N'78ed56dadb164b4c8fee8846b77d689a', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (28, N'Masör', N'd80d9c8951d24e279ee0ba6414b6dc52', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (29, N'Masöz', N'877f1975c99b4d049b2f94bb4e20c66a', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (30, N'Hostes', N'892db5324bf941dfb33c5adea176c4a9', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (31, N'Barmen', N'353ca11f0e644e5a928b620273c92719', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (32, N'Barmaid', N'7275c02ab5934cd5b7a8bc83f3ec1f57', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (33, N'Sorumlu', N'6c9e7210ba33467bb3a715dfc5b35038', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (34, N'Usta', N'8f010d977b1e42339dbd549571fb7305', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (35, N'Kalfa', N'85bd0c7ebb014e8ca582235e6f618447', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (36, N'Amir', N'7888c861ae6244cbb60f7999ac40b959', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (37, N'Kontrolör', N'd071d76f82c24c1894483d5ac6ec61c3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (38, N'Pompacı', N'f322a58d335740149f4fdb54bc6969e9', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (39, N'Gazeteci', N'c9a4fc0d96cf4b929c3a95c814e3d643', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (40, N'Doktor/Hekim', N'6257479340e64add88d0724f55146dd1', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (41, N'Yazar', N'4d492d1548474afdbe9ab2311a4dc14c', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (42, N'Fotoğrafçı', N'543b113a5508472aaf618771a09385d2', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (43, N'Kameraman', N'21f2ad02d4f245148683a33d7f521cf3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (44, N'Kurye', N'c222fa5fcee646028e4945bb4e6681b3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (45, N'Tekniker', N'47c3f2542af64cbba2cfd63ddcb83378', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (46, N'Teknisyen', N'30f8972dfda045de97b31a037306cf2b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (47, N'Ressam', N'b912e24de1774ca1a8e5a76e829b2ef6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (48, N'Resepsiyonist', N'e154cb3a651c4eac915e08340f0096aa', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (49, N'Diyetisyen', N'e0b23a92b33e44e88db88931ed249726', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (50, N'Bulaşıkçı', N'13c3582618a7479287dfc6c7ca56a3ad', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (51, N'Komi', N'2853c8d710f64e5ab444e51f6e0c0036', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (52, N'Modelist', N'0c41e522583346b4876051b30d2f1f1e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (53, N'Stilist', N'bce34426c64e445e8cb6154fe3a1ae3d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (54, N'Tezgahtar', N'3bd98e17089d4ac6848a28d3cd01b3c0', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (55, N'Barista', N'73718c35233b4e7192183dc520cffd41', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (56, N'Web Developer', N'84e89794cdcb4a40956e081855244a5b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (57, N'Müşavir', N'ef08620fe2d54f0ba5342d8d0d4b83e8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (58, N'Yatırımcı', N'ab7d378771704cb1b663b1d4c172bbc3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (59, N'Kat görevlisi', N'cf085bdf0ca54a01a8376bd42be77d20', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (60, N'Anketör', N'48187ac3e6e74780bbac74513dbfce5e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (61, N'Sorumlu', N'12ebc78563504e088c963993209729c6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (62, N'Spiker/Sunucu', N'83b0d8b753924eb685f6de78d82849ab', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (63, N'Manken', N'2034520e9c9c4868a7432ab17c39eea6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (64, N'Tercüman', N'db042603a4b04dddab7378091a89ff5a', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (65, N'Rehber', N'c29c040aa4604e0d858412ab64860700', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (66, N'Sekreter', N'873d08712de346fa855bc057f37c0936', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (67, N'Psikolog', N'38e51f3d17fd43cf9f218a24014cfe4b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (68, N'Akademisyen', N'c756ba641f16499aa4f466bc56a8f8b0', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (69, N'Analist', N'5fd091fd396c4e59903a110205b8da35', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (70, N'Muhabir', N'aaf4ae68a8364db086abea74612efb7a', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (71, N'Antrenör', N'c57936c1bf5b4767a062a1a4db1edd32', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (72, N'Barmen/Barmaid', N'542ce4bb18f0453c99243eae7dbefbf2', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (73, N'Başhekim', N'76887558d7eb4b0a8ed15999ea3f5fd1', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (74, N'Başhemşire', N'a79f5fbd06b74519b991c9dbc8f65052', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (75, N'BeachBoy', N'4a43a701aefb464f8fb73d445a9faa8c', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (76, N'BellBoy', N'34453c0202ff4141bd3d0cb83ffcdd43', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (77, N'Beslenme Uzmanı', N'1f6c0c1a50b14fc9b92987c9970d556b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (78, N'Bilgisayar Mühendisi', N'b97a1021b95445b593da1aad8b5a42ce', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (79, N'Bilgisayar Programcısı', N'095c976cd93f44dbaa81110a884311c0', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (80, N'Biyokimyager', N'bcf66030cf67476bb296af7ce4efccf2', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (81, N'Biyolog', N'bf9a071dd21c453988c970c73d948e1a', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (82, N'Bölge Müdürü', N'9fe96b1c624f4a9f99c8d00bc81aba54', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (83, N'Bölge Sorumlusu', N'b11f6876c6d44bd98dbea7d8d6fbc4b4', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (84, N'Broker', N'c0c80fef9b6d489cae3e62901d56472b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (85, N'Cankurtaran', N'72d648e79cb14555bc3f45b488d8d6ef', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (86, N'Çaycı', N'b05d4d4ef1334edca5ba4deb16cfbca8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (87, N'Çevirmen', N'060ca2ca6a47484dbd65b2096f638594', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (88, N'Animatör', N'62f19a4c666b4f7eb54a6154e2e99567', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (89, N'Daire Başkanı', N'e01be08e25144fa39d256b31ce1882b3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (90, N'Danışma Memurluğu', N'71ce688267a24a5e98877e8690a03878', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (91, N'Dansçı', N'9f4077ea107e45b892b1e0ca93ff7920', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (92, N'Dealer', N'0177839022ba41b6ba392be8db9f072f', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (93, N'Denetçi', N'5bde3951146c44c5bb0beb9fece375b5', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (94, N'Desinatör', N'b31885f7175942aa87b21b19d4072659', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (95, N'Direktör', N'c56fa09f70d9401a968d1cf6e46bdc8e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (96, N'Diş Hekimi/Ortodondist', N'8ffa897fd7274025a695d4101034569f', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (97, N'Diş Teknik Sekreteri', N'945c37b94c4941b3bae1fdaa14cd692d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (98, N'Ebe', N'ddacbc3395234a9b931c9829fbae5a9c', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (99, N'Eczacı', N'494a3957730f447f9fa31f4202375e7b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (100, N'Editör', N'9003dfe3a2fb43e8935a7afa3667b8ad', 1, 0, NULL)
GO
print 'Processed 100 total records'
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (101, N'Eğitmen', N'62e1413bdb184be78e7bc217ffa14816', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (102, N'Estetisyen', N'22fbdffc09cc4aacb2303ef4e63221cb', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (103, N'Farmakolog', N'beebce1df2f34af39f8f3688ddbf8899', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (104, N'Finansal Analist', N'ddff27cbaa1c4f2aa6cc164d98e80d45', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (105, N'Fizyoterapist', N'0f21af833ef34eb99c9cc4ca8086a44f', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (106, N'Forklift Operatörü', N'c081bc3d60224a62b55dffe17e103855', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (107, N'Formen', N'b6916f48a7e44ad0ad0f9168e1b2e81b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (108, N'Gemici', N'8020aaca021e4d2ebd711e83b26472e0', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (109, N'Genel Müdür', N'789368a0df454f84b2d7f53fd3a1c595', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (110, N'Genel Müdür Yrd', N'b1feb13911dd4ec79225ce646934217e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (111, N'Gerber Operatörü', N'27b438a8bc134766bcdf49e440dd1a7f', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (112, N'Grup Müdürü', N'2327a148fd9a46a39cd10208098ad801', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (113, N'Güzellik Uzmanı', N'c6f0ae9260f64c9ebffb76c035dedba8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (114, N'Housekeeper', N'70893a042a7a4c10abc01a402a896bf1', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (115, N'İç Mimar', N'2fdc4b5ecd854df9a067f66e37f07cb1', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (116, N'Çırak', N'7a9f1bd89c224b3faf29bf1511df8957', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (117, N'İşe Alma Uzmanı', N'4f02ec9048664b02a7c1931c0afe8475', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (118, N'İşyeri Hekimi', N'05e028af3d2e4f1eb46fe568d07058c3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (119, N'Kamarot', N'18e155ebb8ab4d84896491ac17d38eaa', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (120, N'Kapı Görevlisi (Doorman', N'94523656c3954a2ebf56901b8b7089bb', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (121, N'Kaptan', N'6eb080913aa54d50bed8373a1946f528', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (122, N'Kardiyolog', N'22d14bad70b549d0b3d701f6c27e7bf0', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (123, N'Kasap', N'f968973a8acb4d3ea45ade8523cee0f8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (124, N'Kasiyer', N'9349864536a948cd8df3e13b33461fb7', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (125, N'Kimyager', N'f7913d49388a49679a53aac62a5dac01', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (126, N'Koordinatör', N'21c84d44d6c141b5a3b0bc1cfaf7375b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (127, N'Kuaför/Berber', N'352f4bf358924060b76b7f0f34e2bc70', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (128, N'Kurs Öğretmeni', N'dd8d7f1134ee4d3db69ba4015d03b635', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (129, N'Laborant', N'05c007e6aae2405aae0538c84601f810', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (130, N'Lectra Operatörü', N'a5a8bc21d788464d85cc7c5d53ffb84c', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (131, N'Lider', N'fc4755cb4fc24715b2a53185e39d7273', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (132, N'Makinist', N'd05d6cf752904f71a7c831b431c99955', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (133, N'Makyöz', N'8e33f48f641d4cd38089ef3f5bbf58b3', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (134, N'Marangoz / Ahşap Ustası', N'b98c7724bdf34560beec3045c42d5765', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (135, N'Masöz/Masör', N'd7cd563f6cf2491fbe2615d9c9f78dcb', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (136, N'Memur', N'dc18c73e61444ee09418fbf42f64e246', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (137, N'Merchandiser', N'728f97974be54f59aed569037734bc37', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (138, N'Miço', N'74a16befdcdf4bcdb7702416313411eb', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (139, N'Mimar', N'4c652f5936f946a991f70640e8fa4a58', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (140, N'Müfettiş', N'85b5c20e84ec43edb081dacc9fe56a1d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (141, N'Mühendis', N'7aa51611e94f420c9213f30cc96e5f52', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (142, N'Müşteri Temsilcisi', N'91606b67a024476086e5562974399448', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (143, N'Müteahhit', N'5d795ceecb2a4f659f940cae0ca0acc6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (144, N'Ofis Elemanı', N'c13052a9d5d44400b2a347d43edab6d6', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (145, N'Öğretim Görevlisi', N'369e4fc180b345449797e9001c7ffd34', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (146, N'Optisyen', N'af8b39ef78d74e3c9c60a3275308f13f', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (147, N'Oyuncu', N'bfffa2dc91134ff4b06a87c886e5432d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (148, N'Pasta ustası', N'ad92cb94611a429385fa8d9010efb1fc', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (149, N'Pedodontist', N'967fe2979ab148ec945b2f3633035b4d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (150, N'Perfüzyonist', N'ab23bb685dcc4e57b0cade3bb63296c5', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (151, N'Pilot', N'39d85f6c712a4aa4bf5fd417fd46ec54', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (152, N'İkinci Müdür', N'659ad3574cce4f618869e6fd75a1c946', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (153, N'Reklam Metin Yazarı', N'8f476b219e0e4edcbc27cedb33179b7d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (154, N'Şarküterist', N'd643ab32c2e24ab4bcd1d54bea177a65', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (155, N'Satış Temsilcisi', N'90106611bb92499bb67d1f0e68952968', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (156, N'Şef Garson', N'8374719b60bf4881a7c9708d9366f0c2', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (157, N'Şef Yardımcısı', N'c36b965661ce49a9ab95514d4a9db651', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (158, N'Sosyolog', N'f1c866b9589f41faa14261bf963f31bc', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (159, N'Sporcu', N'ef24f0e615ba49aa9febf712b99ca03c', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (160, N'Şube Müdürü', N'1acf5d4019614eb6bd5eb51d31e273ae', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (161, N'Süpervizör', N'27f65e245daf4b228b9c5e1c1812ccc9', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (162, N'Tamirci', N'b3672c4eb4b54c0e98e63d585d39ba16', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (163, N'Tayfa', N'07209b236e4743af9f26d7dc97ba7275', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (164, N'Teknik Ressam', N'747df4adbb174a258449dbbef756f3cf', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (165, N'Terzi', N'736067860bc247dc88c5a271227536fc', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (166, N'Tıbbi Mümessil', N'c7f0ee5289d84c429782486355761c8e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (167, N'Tıp Sekreteri', N'1a9d4750b36a43ada0a4481f9e69b89b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (168, N'Topoğraf', N'f60c3a5ef94c44d492388520475ad027', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (169, N'Ücretlendirme Uzmanı', N'15e273c95c4945989e4ae84dc32865b8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (170, N'Ustabaşı', N'5439a95e823f435a8264dae55e72d15d', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (171, N'Uzman Yard', N'3575c753f004433387e98225a76f53fa', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (172, N'Veteriner', N'cfbc4dd7beb04b0da1e2ebca2f22a940', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (173, N'Veteriner Sağlık Teknisyeni', N'5bb1e61d35b743558df2289965b31645', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (174, N'Veznedar', N'4d9dc42d3a9c4a75905b173c740f61b8', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (175, N'Web Designer', N'8a8764252e084ae0abc6711f864d46e5', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (176, N'Yapımcı', N'21a4d8b1a29a4edb8aa337a5fd71c633', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (177, N'Yetkili', N'aebd547a666d40af9be1dceb332f2169', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (178, N'Yetkili Yardımcısı', N'141565efbe704bf6a9225416978ac69e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (179, N'Yönetici Adayı', N'1e407338c22b4105a431761427df6ac1', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (180, N'Yönetici Asistanı', N'eac59262f79341e18230501a7458a3d4', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (181, N'Yönetici Sekreteri', N'c9de315523f149e19b2fa5d1d7ce0ff7', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (182, N'Yönetici/Yönetmen Yardımcısı', N'531a12ba4bcf4131a12e5a784700fc11', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (183, N'Yönetim Danışmanı', N'15c988647e1a4daa9180fae15719b41e', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (184, N'Zabit', N'bcf717777d7a4c88ad76ae179296160a', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (185, N'Bakıcı', N'f84ee86451244c0b9399d8097f0eaf8c', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (186, N'Plasiyer', N'3e25f17a440e41c6b837ddd00f155037', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (187, N'Hemşire', N'ec1dc5f70bc44e32a30d66bf25b04658', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (188, N'Yardımcı', N'd899520b5fd14d7b97c199c75dac0d13', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (189, N'Asistan', N'182e5db87f7e4cf3a82ba821059de46b', 1, 0, NULL)
INSERT [dbo].[GPosition] ([ID], [PositionName], [Guid], [Active], [Archive], [Url]) VALUES (190, N'Şef / Amir', N'c506cc2fe5654de8bc2a25afa86340d1', 1, 0, NULL)
SET IDENTITY_INSERT [dbo].[GPosition] OFF
/****** Object:  Table [dbo].[GPolls]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GPolls](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Header] [nvarchar](max) NOT NULL,
	[Question] [nvarchar](max) NULL,
	[Answers] [nvarchar](max) NULL,
	[Results] [nvarchar](max) NULL,
	[Images] [nvarchar](max) NULL,
	[ExtraText] [nvarchar](max) NULL,
	[ConnectID] [int] NULL,
	[ConnectType] [nvarchar](100) NULL,
	[StartDate] [datetime] NULL,
	[FinishDate] [datetime] NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GHighSchoolType]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GHighSchoolType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HighSchoolTypeName] [nvarchar](255) NULL,
	[Guid] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GFavoriteTypes]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GFavoriteTypes](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FavoriteName] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GFaculties]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GFaculties](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FacultyName] [nvarchar](max) NULL,
	[UniversityID] [int] NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CFavorites]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CFavorites](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FavoriteID] [int] NOT NULL,
	[FavoriteType] [int] NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UUserInfo]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UUserInfo](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
 CONSTRAINT [PK__UUserInf__3214EC272704CA5F] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UFavorites]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UFavorites](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FavoriteID] [int] NOT NULL,
	[FavoriteType] [int] NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK__uFavorit__3214EC276AEFE058] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UApplications]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UApplications](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationName] [nvarchar](100) NULL,
	[CvID] [int] NOT NULL,
	[CoverLetterID] [int] NOT NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GDepartments]    Script Date: 03/21/2016 22:03:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GDepartments](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](max) NULL,
	[FacultyID] [int] NULL,
	[Guid] [nvarchar](255) NOT NULL,
	[Active] [bit] NOT NULL,
	[Archive] [bit] NOT NULL,
	[Url] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF__CCompanyI__Activ__4CC05EF3]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CCompanyInfo] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CCompanyI__Archi__4DB4832C]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CCompanyInfo] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__CApplicat__Activ__4707859D]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CApplications] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CApplicat__Archi__47FBA9D6]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CApplications] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gEducatio__Activ__40F9A68C]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GEducationLevel] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GEducatio__Archi__53A266AC]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GEducationLevel] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__uCVs__Active__59C55456]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UCVs] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UCVs__Archive__60083D91]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UCVs] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__uCoverLet__Activ__5E8A0973]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UCoverLetters] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UCoverLet__Archi__5F141958]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UCoverLetters] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__UBlockedC__Activ__247D636F]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UBlockedCompanies] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UBlockedC__Archi__257187A8]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UBlockedCompanies] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__uSavedSea__Activ__76619304]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[USavedSearches] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__USavedSea__Archi__64CCF2AE]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[USavedSearches] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__uMessages__Activ__7B264821]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UMessages] ADD  CONSTRAINT [DF__uMessages__Activ__7B264821]  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UMessages__Archi__63D8CE75]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UMessages] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__UInvitati__IsAcc__5A1A5A11]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UInvitations] ADD  DEFAULT ((0)) FOR [IsAccepted]
GO
/****** Object:  Default [DF__uFiles__Active__681373AD]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UFiles] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UFiles__Archive__61F08603]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UFiles] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gCountrie__Activ__5441852A]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCountries] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GCountrie__Archi__51BA1E3A]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCountries] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__GContents__Activ__2FEF161B]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GContents] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GContents__Archi__30E33A54]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GContents] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__GCompanie__Activ__2A363CC5]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCompanies] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GCompanie__Archi__2B2A60FE]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCompanies] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__GCities__Active__1DD065E0]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCities] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GCities__Archive__1EC48A19]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCities] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__GCategori__Activ__0ABD916C]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCategories] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GCategori__Archi__0BB1B5A5]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GCategories] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__GAds__Display__7D63964E]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GAds] ADD  DEFAULT ((0)) FOR [Display]
GO
/****** Object:  Default [DF__GAds__Active__7E57BA87]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GAds] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GAds__Archive__7F4BDEC0]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GAds] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__CUserInvi__IsAcc__76B698BF]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CUserInvitations] ADD  DEFAULT ((0)) FOR [IsAccepted]
GO
/****** Object:  Default [DF__CUserInvi__Activ__77AABCF8]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CUserInvitations] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CUserInvi__Archi__789EE131]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CUserInvitations] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__CMessages__Activ__6A50C1DA]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CMessages] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CMessages__Archi__6B44E613]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CMessages] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__CJobs__Active__6497E884]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CJobs] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CJobs__Archive__658C0CBD]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CJobs] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__CInvitati__Activ__5EDF0F2E]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CInvitations] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CInvitati__Archi__5FD33367]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CInvitations] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gUsers__Active__7A672E12]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GUsers] ADD  CONSTRAINT [DF__gUsers__Active__7A672E12]  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GUsers__Archive__5C37ACAD]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GUsers] ADD  CONSTRAINT [DF__GUsers__Archive__5C37ACAD]  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gUniversi__Activ__75A278F5]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GUniversities] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GUniversi__Archi__5B438874]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GUniversities] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__GTowns__Active__125EB334]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GTowns] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GTowns__Archive__1352D76D]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GTowns] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gSector__Active__32AB8735]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GSector] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GSector__Archive__595B4002]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GSector] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gSection__Active__37703C52]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GSection] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GSection__Archiv__58671BC9]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GSection] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gPosition__Activ__3C34F16F]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GPosition] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GPosition__Archi__5772F790]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GPosition] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gPolls__Active__0A9D95DB]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GPolls] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GPolls__Archive__567ED357]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GPolls] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gHighScho__Activ__45BE5BA9]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GHighSchoolType] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GHighScho__Archi__558AAF1E]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GHighSchoolType] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gFacultie__Activ__6C190EBB]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GFaculties] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GFacultie__Archi__54968AE5]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GFaculties] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__CFavorite__Activ__52793849]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CFavorites] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__CFavorite__Archi__536D5C82]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CFavorites] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__uFavorite__Activ__6CD828CA]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UFavorites] ADD  CONSTRAINT [DF__uFavorite__Activ__6CD828CA]  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UFavorite__Archi__60FC61CA]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UFavorites] ADD  CONSTRAINT [DF__UFavorite__Archi__60FC61CA]  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__UApplicat__Activ__1975C517]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UApplications] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__UApplicat__Archi__5D2BD0E6]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UApplications] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  Default [DF__gDepartme__Activ__6754599E]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GDepartments] ADD  DEFAULT ((0)) FOR [Active]
GO
/****** Object:  Default [DF__GDepartme__Archi__52AE4273]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GDepartments] ADD  DEFAULT ((0)) FOR [Archive]
GO
/****** Object:  ForeignKey [FK_gFaculties_gUniversities]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GFaculties]  WITH CHECK ADD  CONSTRAINT [FK_gFaculties_gUniversities] FOREIGN KEY([UniversityID])
REFERENCES [dbo].[GUniversities] ([ID])
GO
ALTER TABLE [dbo].[GFaculties] CHECK CONSTRAINT [FK_gFaculties_gUniversities]
GO
/****** Object:  ForeignKey [FK_CFavorites_GFavoriteTypes]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[CFavorites]  WITH CHECK ADD  CONSTRAINT [FK_CFavorites_GFavoriteTypes] FOREIGN KEY([FavoriteType])
REFERENCES [dbo].[GFavoriteTypes] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CFavorites] CHECK CONSTRAINT [FK_CFavorites_GFavoriteTypes]
GO
/****** Object:  ForeignKey [FK_UUserInfo_GUsers]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UUserInfo]  WITH CHECK ADD  CONSTRAINT [FK_UUserInfo_GUsers] FOREIGN KEY([UserID])
REFERENCES [dbo].[GUsers] ([ID])
GO
ALTER TABLE [dbo].[UUserInfo] CHECK CONSTRAINT [FK_UUserInfo_GUsers]
GO
/****** Object:  ForeignKey [FK_UFavorites_GFavoriteTypes]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UFavorites]  WITH CHECK ADD  CONSTRAINT [FK_UFavorites_GFavoriteTypes] FOREIGN KEY([FavoriteType])
REFERENCES [dbo].[GFavoriteTypes] ([ID])
GO
ALTER TABLE [dbo].[UFavorites] CHECK CONSTRAINT [FK_UFavorites_GFavoriteTypes]
GO
/****** Object:  ForeignKey [FK_UApplications_UCoverLetters]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UApplications]  WITH CHECK ADD  CONSTRAINT [FK_UApplications_UCoverLetters] FOREIGN KEY([CoverLetterID])
REFERENCES [dbo].[UCoverLetters] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UApplications] CHECK CONSTRAINT [FK_UApplications_UCoverLetters]
GO
/****** Object:  ForeignKey [FK_UApplications_UCVs]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[UApplications]  WITH CHECK ADD  CONSTRAINT [FK_UApplications_UCVs] FOREIGN KEY([CvID])
REFERENCES [dbo].[UCVs] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UApplications] CHECK CONSTRAINT [FK_UApplications_UCVs]
GO
/****** Object:  ForeignKey [FK_GDepartments_GFaculties]    Script Date: 03/21/2016 22:03:13 ******/
ALTER TABLE [dbo].[GDepartments]  WITH CHECK ADD  CONSTRAINT [FK_GDepartments_GFaculties] FOREIGN KEY([FacultyID])
REFERENCES [dbo].[GFaculties] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[GDepartments] CHECK CONSTRAINT [FK_GDepartments_GFaculties]
GO
