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
  const accessToken = user.accessToken;
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
  const accessToken = user.accessToken;
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

export async function getSchools(universityId) {
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

export async function getDegrees(universityId, schoolId) {
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

export async function completeProfile(user, userData) {
  const accessToken = user.accessToken;

  if (
    !userData.name ||
    !userData.surname ||
    !userData.username ||
    !userData.university ||
    !userData.school ||
    !userData.degree
  ) {
    throw new Error("Mirrsing params");
  }

  fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/completeprofile`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function uploadFiles(user, docData) {
  const accessToken = user.accessToken;

  console.log(docData);

  fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/upload`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(docData),
  });
}
