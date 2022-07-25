import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import useStore from "@/store/store";
import styles from "./Modify.module.css";

import tokens from "../../../tokens.json";

export default function Modify() {
  const history = useRouter();
  const { ponds } = useStore((state) => ({
    ponds: state.ponds,
  }));

  const [currentPond, setCurrentPond] = useState(null);

  useEffect(() => {
    if (history.query.pondIndex) {
      const pond = ponds.find(
        ({ index }) => index === Number(history.query.pondIndex)
      );
      setCurrentPond(pond);
    }
  }, [history.query.pondIndex]);

  const onModify = (action) => async () => {
    try {
      const pondTokenAddress = currentPond.details._params.token;
      const tokenConfig = tokens.find(
        ({ address }) => address === pondTokenAddress
      );

      if (!tokenConfig) {
        throw new Error(
          `Token with address: ${pondTokenAddress} has no configuration`
        );
      }

      if (action === 'activate') {
        await currentPond.ref.activate();
      } else if (action === 'deactivate') {
        await currentPond.ref.deactivate();
      } else if (action === 'destroy') {
        await currentPond.ref.destroy();
      }

      history.replace("/");

    } catch (err) {
      console.log(action, " error: ", JSON.stringify(err, undefined, 2));

      if (err.data) {
        toast.error(err.data.message);
      }
    }
  };


  return (
    <div className={styles.container}>
      {currentPond && (
        <div>
          <h1>{`Modify ${currentPond.details._params.name}`}</h1>
          {currentPond.details._active ? (
            <div>
              <h2>Pond status is: active</h2>
              <h2>{`Deactivate ${currentPond.details._params.name}:`}</h2>
              <Button {...{ label: "Deactivate", onClick: onModify('deactivate') }} />
            </div>
          ) : (
            <div>
              <h2>Pond status is: inactive</h2>
              <h2>{`Activate ${currentPond.details._params.name}:`}</h2>
              <Button {...{ label: "Activate", onClick: onModify('activate') }} />
            </div>
          )}
          <h2>{`Destroy ${currentPond.details._params.name}:`}</h2>
          <Button {...{ label: "Destroy", onClick: onModify('destroy') }} />
        </div>
      )
      }
    </div >
  );
}
