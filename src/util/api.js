export async function isUsernameAvailable(username) {
  if (!username) throw new Error("Username is not defined");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/isusernameavailable?` +
      new URLSearchParams({
        username: username,
      }),
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data.available;
}

export async function getUserData(user) {
  if (!user) throw new Error("User is not defined");
  const accessToken = await user.auth.currentUser.getIdToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/userdata`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function sendVerificationEmail(user) {
  if (!user) throw new Error("User is not defined");
  const accessToken = await user.auth.currentUser.getIdToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/sendverificationemail`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    }
  );
  if (res.status == 200) {
    return await res.json();
  }
  throw new Error("Internal Server Error");
}

export async function getUniversities() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/universities`,
    { method: "GET" }
  );

  if (data.status == 200) {
    return await data.json();
  }
  throw new Error("Internal Server Error");
}

export async function getUniversity(universityId) {
  if (!universityId) throw new Error("University ID Is Required");
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/universities/${universityId}`,
    { method: "GET" }
  );

  if (data.status == 200) {
    return await data.json();
  }

  if (data.status == 404) {
    throw new Error("Not found");
  }

  if (data.status == 500) {
    throw new Error("Internal Server Error");
  }

  throw new Error("Internal Server Error");
}

export async function getSchool(universityId, schoolId) {
  if (!universityId) throw new Error("University ID Is Required");
  if (!schoolId) throw new Error("School ID Is Required");
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/universities/${universityId}/${schoolId}`,
    { method: "GET" }
  );

  if (data.status == 200) {
    return await data.json();
  }

  if (data.status == 404) {
    throw new Error("Not found");
  }

  if (data.status == 500) {
    throw new Error("Internal Server Error");
  }
  throw new Error("Internal Server Error");
}

export async function getDegree(universityId, schoolId, degreeId) {
  if (!universityId) throw new Error("University ID Is Required");
  if (!schoolId) throw new Error("School ID Is Required");
  if (!degreeId) throw new Error("Degree ID Is Required");
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/universities/${universityId}/${schoolId}/${degreeId}`,
    { method: "GET" }
  );

  if (data.status == 200) {
    return await data.json();
  }

  if (data.status == 404) {
    throw new Error("Not found");
  }

  if (data.status == 500) {
    throw new Error("Internal Server Error");
  }
  throw new Error("Internal Server Error");
}

export async function getSubject(subjectId, limit = 5, startAfter = "") {
  if (!subjectId) throw new Error("Subject Id is required");

  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_FRONTEND_URL
    }/api/subject/${subjectId}?${new URLSearchParams({
      limit: limit,
      startAfter: startAfter,
    })}`,
    {
      method: "GET",
    }
  );

  if (data.status == 200) {
    return await data.json();
  }

  if (data.status == 404) {
    throw new Error("Not found");
  }

  if (data.status == 500) {
    throw new Error("Internal Server Error");
  }
  throw new Error("Internal Server Error");
}

export async function getDocument(subjectId, docId) {
  if (!subjectId) throw new Error("Subject Id is required");
  if (!docId) throw new Error("Doc Id is required");

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/subject/${subjectId}/${docId}`,
    { method: "GET" }
  );

  if (data.status == 200) {
    return await data.json();
  }

  if (data.status == 404) {
    throw new Error("Not found");
  }

  if (data.status == 500) {
    throw new Error("Internal Server Error");
  }
  throw new Error("Internal Server Error");
}

export async function completeProfile(user, userData) {
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/completeprofile`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(userData),
    }
  );

  if (res.status === 200) {
    return;
  }
  throw new Error("Internal server error");
}

export async function uploadFile(user, docData) {
  const accessToken = await user.auth.currentUser.getIdToken();

  // TODO: handle errors
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/upload`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(docData),
    }
  );

  if (res.status !== 200) {
    throw new Error("Internal server error");
  }

  return await res.json();
}

export async function completeKYC(user, data) {
  const accessToken = await user.auth.currentUser.getIdToken();

  // TODO: handle errors
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/kyc`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (res.status === 200) return res.json();
  throw new Error("Internal server error");
}

export async function createCardRegistration(user) {
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/createcardregistration`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
    }
  );

  if (res.status !== 200) throw new Error("Internal server error");

  return await res.json();
}

export async function completeCardRegistration(id, registrationData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/completecardregistration`,
    {
      method: "POST",

      body: JSON.stringify({
        id: id,
        registrationData: registrationData,
      }),
    }
  );

  if (res.status !== 200) throw new Error("Internal server error");

  return await res.json();
}

export async function getCards(user) {
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/getcards`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("Internal server error");
  return await res.json();
}

export async function buy(user, cardId, documents, headers) {
  const accessToken = await user.auth.currentUser.getIdToken();
  const products = documents.map((doc) => doc.subjectId + "/" + doc.docId);

  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/buy`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      cardId: cardId,
      products: products,
      screenHeight: screen.height,
      screenWidth: screen.width,
      colorDepth: screen.colorDepth,
      language: navigator.language,
      javaEnabled: navigator.javaEnabled(),
      timezoneOffset: new Date().getTimezoneOffset(),
      userAgent: navigator.userAgent,
      acceptHeaders: headers.accept,
    }),
  });

  if (res.status === 200) return await res.json();
  if (res.status === 400) throw new Error("Bad Request");
  throw new Error("Internal server error");
}

export async function getTransaction(user, transactionId) {
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/transaction/${transactionId}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status === 200) return await res.json();

  if (res.status === 404) throw new Error("Not found");
  throw new Error("Internal server error");
}

export async function getDownloadUrl(user, subjectId, docId) {
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/getdownloadurl/${subjectId}/${docId}`,
    { method: "GET", headers: { authorization: `Bearer ${accessToken}` } }
  );

  if (res.status === 200) return res.json();
  throw new Error("Internal server error");
}

export async function getUser(userId) {
  if (!userId) throw new Error("UserId is required");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/${userId}`,
    { method: "GET" }
  );

  if (res.status === 200) return res.json();
  throw new Error("Internal server error");
}

export async function getBalance(user) {
  if (!user) throw new Error("User is required");
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/getbalance`,
    { method: "GET", headers: { authorization: `Bearer ${accessToken}` } }
  );

  if (res.status === 200) return (await res.json()).balance;
  throw new Error("Internal server errror");
}

export async function updateBankAccount(user, iban) {
  if (!user) throw new Error("User is required");
  if (!iban) throw new Error("Iban is required");

  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/updatebankaccount`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ iban: iban }),
    }
  );

  if (res.status === 200) return res.json();
  if (res.status === 400) throw new Error("Bad Request");
  throw new Error("Internal server errror");
}

export async function getBankAccount(user) {
  if (!user) throw new Error("User is required");

  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/getbankaccount`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status !== 200) throw new Error("Internal server errror");

  const response = await res.json();
  if (response.length) {
    return response[0];
  }

  return null;
}

export async function payout(user) {
  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/payout`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status === 200) return res.json();
  else throw new Error("Internal server error");
}

export async function deleteCard(user, cardId) {
  if (!user) throw new Error("User is required");
  if (!cardId) throw new Error("CardId is required");

  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/deletecard`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ cardId: cardId }),
    }
  );

  if (res.status === 200) return res.json();
  throw new Error("Internal server errror");
}

export async function sendResetPasswordEmail(email) {
  if (!email) throw new Error("Email is required");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/resetpassword`,
    {
      method: "POST",
      body: JSON.stringify({ email: email }),
    }
  );

  if (res.status === 200) return res.json();
  throw new Error("Internal server errror");
}

export async function addReferral(user, ref) {
  if (!user) throw new Error("User is required");
  if (!ref) throw new Error("Ref is required");

  const accessToken = await user.auth.currentUser.getIdToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/addreferral`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ref: ref }),
    }
  );

  if (res.status === 200) return res.json();
  throw new Error("Internal server errror");
}
