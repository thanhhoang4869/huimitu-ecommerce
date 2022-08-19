import { DatePicker, Form, Input, PageHeader, Radio, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { AccountContext } from "context/AccountContext";
import moment from "moment";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import accountService from "services/account";
import swal from "sweetalert2";
import { validateMinLength, validatePhone } from "utils/validator";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const UpdateInformationPage = () => {
  const { account, fetchAccount } = useContext(AccountContext);
  const navigator = useNavigate();
  const { logout } = useContext(AccountContext);
  const [form] = useForm();

  const { t } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));

    fetchAccount();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [account]);

  const handleChangeInformation = async (data) => {
    try {
      const { fullname, gender, birthday, phone } = data;

      if (!(fullname && gender && birthday && phone)) {
        return swal.fire({
          title: "Đổi thông tin",
          text: "Vui lòng nhập tất cả thông tin",
          icon: "info",
          confirmButtonText: "OK",
        });
      }

      if (!validatePhone(phone)) {
        return swal.fire({
          title: "Đổi thông tin",
          text: "Vui lòng nhập số điện thoại hợp lệ",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

      const response = await accountService.updateInformation({
        fullname: fullname,
        gender: gender,
        birthday: moment(birthday).format("DD/MM/YYYY"),
        phone: phone,
      });

      const { exitcode } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          await swal.fire({
            title: t("userInformation.changeTitle"),
            text: t("userInformation.changeInfoSuccess"),
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.reload();
          break;
        }
        case 103: {
          swal.fire({
            title: t("userInformation.changeTitle"),
            text: t("userInformation.usedPhoneNumber"),
            icon: "error",
            confirmButtonText: "OK",
          });
          break;
        }
      }
    } catch (err) {
      navigator("/error");
    }
  };

  const handleChangePassword = async (data) => {
    const { password, newPassword, confirmPassword } = data;

    if (!(newPassword && confirmPassword)) {
      return swal.fire({
        text: t("userInformation.pleaseEnterAll"),
        icon: "info",
        confirmButtonText: "OK",
      });
    }

    if (!validateMinLength(password, 6) || !validateMinLength(newPassword, 6)) {
      return swal.fire({
        text: t("userInformation.moreThan6Letters"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    if (newPassword !== confirmPassword) {
      return swal.fire({
        text: t("userInformation.notMatchingPass"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    const response = await accountService.changePassword(
      password,
      newPassword,
      confirmPassword
    );
    const { exitcode } = response.data;

    // eslint-disable-next-line default-case
    switch (exitcode) {
      case 0: {
        await swal.fire({
          title: "Success",
          text: t("userInformation.changePassSuccess"),
          icon: "success",
          confirmButtonText: "OK",
        });
        logout();
        break;
      }
      case 101: {
        swal.fire({
          text: t("userInformation.wrongPass"),
          icon: "error",
          confirmButtonText: "OK",
        });
        break;
      }
    }
  };

  return (
    <div>
      <PageHeader title={t("userInformation.changeTitle")} />
      <Form form={form} {...formItemLayout} onFinish={handleChangeInformation}>
        <Form.Item
          name="fullname"
          initialValue={account.fullname}
          label={t("userInformation.fullname")}
        >
          <Input size="large" placeholder={t("userInformation.fullname")} />
        </Form.Item>
        <Form.Item
          name="phone"
          initialValue={account.phone}
          label={t("userInformation.phoneNumber")}
        >
          <Input size="large" placeholder={t("userInformation.enterPhoneNumber")} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 4 }}
          labelCol={{ span: 6 }}
          name="birthday"
          initialValue={moment(account.birthday || new Date(), "DD/MM/YYYY")}
          label={t("userInformation.dob")}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder={t("userInformation.chooseDay")}
            size="large"
            allowClear={false}
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item
          initialValue={account.gender}
          span={14}
          wrapperCol={{ span: 8 }}
          labelCol={{ span: 6 }}
          name="gender"
          label={t("userInformation.gender")}
        >
          <Radio.Group style={{ width: "100%" }} size="large">
            <Radio value="male">{t("userInformation.male")}</Radio>
            <Radio value="female">{t("userInformation.female")}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-center">
            <Button size="large" type="primary" htmlType="submit">
            {t("userInformation.update")}
            </Button>
          </div>
        </Form.Item>
      </Form>
      <PageHeader title={t("userInformation.changePass")} />
      <Form {...formItemLayout} onFinish={handleChangePassword}>
        <Form.Item label={t("userInformation.curPass")} name="password">
          <Input.Password size="large" placeholder={t("userInformation.enterPass")} />
        </Form.Item>
        <Form.Item label={t("userInformation.newPass")} name="newPassword">
          <Input.Password size="large" placeholder={t("userInformation.enterNewPass")} />
        </Form.Item>
        <Form.Item label={t("userInformation.confirmNewPass")} name="confirmPassword">
          <Input.Password
            password
            size="large"
            placeholder={t("userInformation.enterNewPass")}
          />
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-center">
            <Button size="large" type="primary" htmlType="submit">
            {t("userInformation.change")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateInformationPage;
